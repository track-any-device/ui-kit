# Adding a New Website Section Type

Follow these 5 steps every time you need a new section type.
The existing codebase is the template — copy the pattern, don't improvise.

---

## 1. Create the React component

```
src/components/website/sections/my-section.tsx
```

```tsx
import { cn } from '../../../lib/utils';
import type { MyContent } from '../types';   // ← add type in step 2

const defaultContent: MyContent = { /* sensible defaults */ };

export function MySection({
    content = defaultContent,
    identifier,
}: {
    content?: MyContent;
    identifier?: string | null;
}) {
    return (
        <section id={identifier ?? undefined} className="bg-background py-20 sm:py-24">
            {/* ... */}
        </section>
    );
}

// sample props used by Storybook and admin previews
export const mySectionSampleProps: MyContent = { /* ... */ };

export default MySection;
```

Rules:
- All content comes from `content` props — no hardcoded strings.
- Support at least 2 `variant` values.
- Use `SectionBackground` for backgrounds when needed.
- Use `SectionButtons` for CTA buttons.
- Use `PlatformLink` for internal links (not `<a>`).
- Export both the named component and `mySectionSampleProps`.

---

## 2. Add TypeScript types

Open `src/components/website/types.ts` and add:

```ts
// ─── My Section ───────────────────────────────────────────────────────────────
export type MyContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    variant?: 'default' | 'alt' | null;
    items?: MyItem[] | null;
    // ...
};

// Add 'my_section' to the union:
export type WebsiteSectionType =
    | ...existing types...
    | 'my_section';   // ← add here
```

---

## 3. Register the component

Open `src/components/website/registry.ts` and add two lines:

```ts
// import
import { MySection } from './sections/my-section';

// register
my_section: MySection,
```

---

## 4. Export from the index

Add to `src/components/website/index.ts`:

```ts
export { MySection, mySectionSampleProps } from './sections/my-section';
```

And to `src/index.ts`:

```ts
export { MySection, mySectionSampleProps } from './components/website/sections/my-section';
```

---

## 5. Add a Storybook story

In `stories/components/WebsiteSections.stories.tsx`:

```tsx
import { MySection, mySectionSampleProps } from '@trackany-device/components';

export const MySectionDefault: StoryObj = {
    name: 'MySection / Default',
    render: () => <MySection content={mySectionSampleProps} />,
};

export const MySectionAlt: StoryObj = {
    name: 'MySection / Alt',
    render: () => <MySection content={{ ...mySectionSampleProps, variant: 'alt' }} />,
};
```

---

## 6. Add Filament form (Laravel side)

In `app/Filament/Resources/PageSectionResource.php`:

1. Add to `SECTION_TYPES`:
   ```php
   'my_section' => 'My Section',
   ```

2. Add to `contentSchemaFor()` match:
   ```php
   'my_section' => self::mySectionSchema(),
   ```

3. Add the private method:
   ```php
   private static function mySectionSchema(): array
   {
       return [
           self::eyebrowField(),
           self::titleField(),
           self::subtitleField(),
           self::variantSelect(['default' => 'Default', 'alt' => 'Alternative']),
           // ... repeaters for items etc.
       ];
   }
   ```

---

## Checklist

- [ ] `src/components/website/sections/my-section.tsx` created
- [ ] `MyContent` type added to `types.ts`
- [ ] `'my_section'` added to `WebsiteSectionType` union
- [ ] Entry added to `sectionRegistry` in `registry.ts`
- [ ] Exported from `website/index.ts` and `src/index.ts`
- [ ] Storybook story added to `WebsiteSections.stories.tsx`
- [ ] Filament `SECTION_TYPES`, `contentSchemaFor()`, and schema method updated
- [ ] Seed JSON entry added if needed

That's it. `SectionRenderer` will pick it up automatically.
