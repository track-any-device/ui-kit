import type { Meta, StoryObj } from '@storybook/react';

// ProductCard uses @inertiajs/react Link. Render a representative visual mock.
const meta: Meta = { title: 'Elements/Products/ProductCard', tags: ['autodocs'] };
export default meta;

const mockProduct = {
    id: 1, name: 'P901 Smart GPS Tracker', slug: 'p901',
    description: 'Smart ID card GPS walkie-talkie with real-time tracking.',
    image: null, price_usd: 49.99, price_pkr: 14000,
    min_quantity: 1, quantity_multiple: 1, is_featured: true,
};

export const Default: StoryObj = {
    render: () => (
        <div className="max-w-xs p-4">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="h-44 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-5xl">📡</div>
                <div className="p-4 space-y-1">
                    <p className="font-semibold">{mockProduct.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{mockProduct.description}</p>
                    <div className="flex gap-3 pt-1">
                        <span className="text-sm font-bold text-primary">${mockProduct.price_usd}</span>
                        <span className="text-xs text-muted-foreground">PKR {mockProduct.price_pkr?.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    ),
};

export const Featured: StoryObj = {
    render: () => (
        <div className="max-w-xs p-4">
            <div className="rounded-xl border-2 border-primary bg-card overflow-hidden relative">
                <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full z-10">Featured</span>
                <div className="h-44 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center text-5xl">📡</div>
                <div className="p-4">
                    <p className="font-semibold">{mockProduct.name}</p>
                    <span className="text-sm font-bold text-primary">${mockProduct.price_usd}</span>
                </div>
            </div>
        </div>
    ),
};
