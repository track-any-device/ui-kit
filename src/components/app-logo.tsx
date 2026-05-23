import logoUrl from '../assets/logo.png';

export default function AppLogo({
    className,
    src,
    alt = 'Logo',
    ...props
}: React.ComponentProps<'div'> & { src?: string; alt?: string }) {
    return (
        <div
            className={`flex items-center gap-2${className ? ` ${className}` : ''}`}
            {...props}
        >
            <img
                src={src ?? logoUrl}
                alt={alt}
                className="h-8 max-w-[120px] object-contain group-data-[collapsible=icon]:hidden"
            />
        </div>
    );
}
