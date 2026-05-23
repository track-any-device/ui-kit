import type { Meta, StoryObj } from '@storybook/react';
import { WebLayout, ProductCard } from '@track-any-device/components';
import { MockPage } from '../../../.storybook/mocks/inertia-react';

const mockNavLinks = [
    { id: 1, label: 'Products', href: '/products', target: '_self' },
    { id: 2, label: 'Solutions', href: '/solutions', target: '_self' },
];
const webPageProps = { nav_links: mockNavLinks, auth: { user: null }, flash: {}, errors: {} };

const mockProducts = [
    { id: 1, name: 'P901 Smart ID Card GPS', slug: 'p901', description: 'Walkie-talkie GPS tracker with cellular GPRS reporting, punch-in/out, SOS alarm, and 2-way call.', image: null, price_usd: 18, price_pkr: 4999, badge_label: 'Best seller', badge_color: null },
    { id: 2, name: 'GF-07 Mini GPS Tracker', slug: 'gf07', description: 'Compact magnetic tracker ideal for vehicles, luggage, or covert monitoring.', image: null, price_usd: 9, price_pkr: 2499, badge_label: null, badge_color: null },
    { id: 3, name: 'AOT120 Vehicle Tracker', slug: 'aot120', description: 'OBD-II plug-and-play vehicle tracker with JT808 protocol support.', image: null, price_usd: 25, price_pkr: 6999, badge_label: 'New', badge_color: null },
];

const meta: Meta = {
    title: 'Apps/Web/Products',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [(Story) => <MockPage props={webPageProps} url="/products"><Story /></MockPage>],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <WebLayout>
            <div className="mx-auto max-w-7xl px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Device Catalog</h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {mockProducts.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            currency="PKR"
                            actionHref={`/products/${p.slug}`}
                        />
                    ))}
                </div>
            </div>
        </WebLayout>
    ),
};
