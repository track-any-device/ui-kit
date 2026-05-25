import type { PageSection } from './types';
import { sectionRegistry, type SectionComponent } from './registry';

/**
 * SectionRenderer
 *
 * Accepts a list of PageSection records (from the Laravel backend) and renders
 * each active section in sort_order using the component registry.
 *
 * Usage:
 *   <SectionRenderer sections={page.sections} />
 *
 * You can override individual sections by passing a custom registry:
 *   <SectionRenderer sections={page.sections} registry={{ hero: MyHero }} />
 */
export function SectionRenderer({
    sections,
    registry,
}: {
    sections: PageSection[];
    registry?: Partial<Record<string, SectionComponent>>;
}) {
    const active = sections
        .filter((s) => s.active)
        .sort((a, b) => a.sort_order - b.sort_order);

    if (active.length === 0) return null;

    const merged = { ...sectionRegistry, ...registry } as Record<string, SectionComponent>;

    return (
        <>
            {active.map((section) => {
                const Component = merged[section.type];

                if (!Component) {
                    if (import.meta.env?.MODE !== 'production') {
                        console.warn(`[SectionRenderer] No component registered for section type: "${section.type}"`);
                    }
                    return null;
                }

                return (
                    <Component
                        key={section.id}
                        content={section.content}
                        identifier={section.identifier}
                    />
                );
            })}
        </>
    );
}

export default SectionRenderer;
