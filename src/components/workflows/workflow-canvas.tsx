'use client';

/**
 * WorkflowCanvas — React Flow visual editor for workflow graphs.
 *
 * The underlying data shape (nodes + edges with action_type / config in
 * node.data) was already React-Flow-compatible — this component drops in
 * over the same structure the executor walks server-side.
 *
 * The toolbar lives in the parent edit page; this component renders only
 * the canvas + action palette and emits change events upward.
 */
import {
    addEdge,
    Background,
    Controls,
    Handle,
    Position,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import type { Connection, Edge, Node, NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
    AlertCircle,
    Bell,
    Hourglass,
    Plus,
    Send,
    Trash2,
    Webhook,
    Zap,
} from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import type { ComponentType } from 'react';

import { cn } from '../../lib/utils';

export type WorkflowNodeData = {
    action_type: string;
    label: string;
    config: Record<string, unknown>;
};

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

export type WorkflowGraph = {
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
};

type ActionOption = {
    value: string;
    label: string;
    icon: string;
    color: string;
};

type Props = {
    graph: WorkflowGraph;
    actions: ActionOption[];
    onChange: (graph: WorkflowGraph) => void;
    onNodeSelect: (nodeId: string | null) => void;
    selectedNodeId: string | null;
};

const ACTION_ICON: Record<string, ComponentType<{ className?: string }>> = {
    trigger: Zap,
    wait: Hourglass,
    notify: Bell,
    send_command: Send,
    escalate_incident: AlertCircle,
    webhook: Webhook,
};

const ACTION_TONE: Record<string, string> = {
    trigger: 'border-primary/50 bg-primary/10 text-primary',
    wait: 'border-warning/40 bg-warning-subtle text-warning-fg',
    notify: 'border-info/40 bg-info-subtle text-info-fg',
    send_command: 'border-primary/50 bg-primary/10 text-primary',
    escalate_incident: 'border-danger/40 bg-danger-subtle text-danger',
    webhook: 'border-border bg-accent text-accent-foreground',
};

function WorkflowNodeRenderer({ data, selected, id }: NodeProps<WorkflowNode>) {
    const Icon = ACTION_ICON[data.action_type] ?? Plus;
    const tone = ACTION_TONE[data.action_type] ?? 'border-border bg-card';
    const isTrigger = data.action_type === 'trigger';

    return (
        <div
            className={cn(
                'min-w-[180px] rounded-xl border-2 bg-background px-4 py-3 shadow-sm transition-all',
                tone,
                selected &&
                    'ring-2 ring-primary ring-offset-2 ring-offset-background',
            )}
            data-node-id={id}
        >
            {!isTrigger && (
                <Handle
                    type="target"
                    position={Position.Left}
                    className="!h-3 !w-3 !border-2 !bg-background"
                />
            )}
            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        'grid size-8 shrink-0 place-items-center rounded-full',
                        tone,
                    )}
                >
                    <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                        {data.label}
                    </p>
                    <p className="truncate text-[10px] tracking-wide text-muted-foreground uppercase">
                        {data.action_type.replace('_', ' ')}
                    </p>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !border-2 !bg-background"
            />
        </div>
    );
}

const nodeTypes = { workflowNode: WorkflowNodeRenderer };

function Canvas({
    graph,
    actions,
    onChange,
    onNodeSelect,
    selectedNodeId,
}: Props) {
    const [nodes, setNodes, onNodesChange] = useNodesState<WorkflowNode>(
        graph.nodes,
    );
    const [edges, setEdges, onEdgesChange] = useEdgesState<WorkflowEdge>(
        graph.edges,
    );
    // Track which graph (by reference equality) is currently mirrored into
    // React Flow state. When the parent replaces the graph (e.g. on save),
    // we reset internal state to match.
    const lastSyncedGraph = useRef(graph);

    useEffect(() => {
        if (graph !== lastSyncedGraph.current) {
            setNodes(graph.nodes);
            setEdges(graph.edges);
            lastSyncedGraph.current = graph;
        }
    }, [graph, setNodes, setEdges]);

    // Push canvas changes back to the parent so save sees the latest graph.
    useEffect(() => {
        const next = { nodes, edges };
        onChange(next);
        lastSyncedGraph.current = next;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodes, edges]);

    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    const addNode = (actionType: string) => {
        // Date.now() is flagged by the react-hooks/purity rule because
        // it's impure; addNode is an event handler (not called during
        // render), so reading the clock here is safe — eslint-disable
        // the one line rather than memoising a counter.
        // eslint-disable-next-line react-hooks/purity
        const id = `${actionType}-${Date.now()}`;
        const lastNode = nodes[nodes.length - 1];
        const x = lastNode ? lastNode.position.x + 240 : 100;
        const y = lastNode ? lastNode.position.y : 100;
        const newNode: WorkflowNode = {
            id,
            type: 'workflowNode',
            position: { x, y },
            data: {
                action_type: actionType,
                label:
                    actions.find((a) => a.value === actionType)?.label ??
                    actionType,
                config: defaultConfigFor(actionType),
            },
        };

        const newEdges = lastNode
            ? [
                  {
                      id: `e-${lastNode.id}-${id}`,
                      source: lastNode.id,
                      target: id,
                  },
              ]
            : [];

        setNodes((ns) => [...ns, newNode]);
        setEdges((es) => [...es, ...newEdges]);
        onNodeSelect(id);
    };

    const removeSelectedNode = () => {
        if (!selectedNodeId || selectedNodeId === 'trigger') {
            return;
        }

        setNodes((ns) => ns.filter((n) => n.id !== selectedNodeId));
        setEdges((es) =>
            es.filter(
                (e) =>
                    e.source !== selectedNodeId && e.target !== selectedNodeId,
            ),
        );
        onNodeSelect(null);
    };

    return (
        <div className="flex h-full">
            {/* Left rail — action palette */}
            <aside className="w-56 shrink-0 overflow-auto border-r border-border bg-card p-4">
                <h2 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Actions
                </h2>
                <div className="space-y-2">
                    {actions.map((a) => {
                        const Icon = ACTION_ICON[a.value] ?? Plus;

                        return (
                            <button
                                key={a.value}
                                onClick={() => addNode(a.value)}
                                className={cn(
                                    'flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors hover:bg-accent',
                                    ACTION_TONE[a.value] ??
                                        'border-border bg-background',
                                )}
                            >
                                <Icon className="size-4 shrink-0" />
                                {a.label}
                            </button>
                        );
                    })}
                </div>

                {selectedNodeId && selectedNodeId !== 'trigger' && (
                    <button
                        onClick={removeSelectedNode}
                        className="mt-6 flex w-full items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
                    >
                        <Trash2 className="size-4 shrink-0" />
                        Delete selected node
                    </button>
                )}
            </aside>

            {/* Canvas */}
            <div className="flex-1 bg-muted/30">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={(_, node) => onNodeSelect(node.id)}
                    onPaneClick={() => onNodeSelect(null)}
                    nodeTypes={nodeTypes}
                    fitView
                    fitViewOptions={{ padding: 0.2, maxZoom: 1.5 }}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background gap={20} size={1} />
                    <Controls position="bottom-right" />
                </ReactFlow>
            </div>
        </div>
    );
}

/**
 * Wrap the canvas in ReactFlowProvider so multiple instances can coexist
 * (e.g. a future split view of workflow + run logs side by side).
 */
export function WorkflowCanvas(props: Props) {
    return (
        <ReactFlowProvider>
            <Canvas {...props} />
        </ReactFlowProvider>
    );
}

function defaultConfigFor(actionType: string): Record<string, unknown> {
    switch (actionType) {
        case 'wait':
            return { seconds: 10 };
        case 'notify':
            return { channels: ['in_app'], message: '' };
        case 'send_command':
            return { command: '', parameters: {} };
        case 'escalate_incident':
            return { priority: 'critical' };
        case 'webhook':
            return { url: '', method: 'POST' };
        default:
            return {};
    }
}
