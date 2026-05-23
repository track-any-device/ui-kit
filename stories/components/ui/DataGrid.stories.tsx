import type { Meta, StoryObj } from '@storybook/react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, createColumnHelper } from '@tanstack/react-table';
import { DataGrid, DataGridTable, DataGridPagination } from '@trackany-device/components';

interface Vehicle { id: string; registration: string; status: string; driver: string; speed: number; }

const DATA: Vehicle[] = Array.from({ length: 25 }, (_, i) => ({
    id: String(i + 1),
    registration: `LEA-${String(i + 1).padStart(3, '0')}`,
    status: ['Online', 'Offline', 'Idle', 'Moving'][i % 4],
    driver: ['Ali Hassan', 'Malik Rashid', 'Farhan Malik', 'Usman Khan'][i % 4],
    speed: [0, 45, 62, 80][i % 4],
}));

const col = createColumnHelper<Vehicle>();
const COLUMNS = [
    col.accessor('registration', { header: 'Registration' }),
    col.accessor('status', { header: 'Status' }),
    col.accessor('driver', { header: 'Driver' }),
    col.accessor('speed', { header: 'Speed (km/h)' }),
];

function VehicleGrid() {
    const table = useReactTable({ data: DATA, columns: COLUMNS, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel() });
    return (
        <DataGrid table={table} recordCount={DATA.length}>
            <DataGridTable />
            <DataGridPagination />
        </DataGrid>
    );
}

const meta: Meta = { title: 'Components/UI/DataGrid', parameters: { layout: 'padded' } };
export default meta;

export const Default: StoryObj = { render: () => <VehicleGrid /> };
