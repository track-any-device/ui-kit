'use client';

import * as React from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';

interface AvatarGroupContextValue {
    tooltipClassName?: string;
    animation?: 'default' | 'flip' | 'reveal';
}

const AvatarGroupContext = React.createContext<AvatarGroupContextValue | null>(null);

export function AvatarGroup({
    children,
    className,
    tooltipClassName,
    animation = 'default',
}: {
    children: React.ReactNode;
    className?: string;
    tooltipClassName?: string;
    animation?: 'default' | 'flip' | 'reveal';
}) {
    return (
        <AvatarGroupContext.Provider value={{ tooltipClassName, animation }}>
            <div className={cn('flex -space-x-2.5', className)}>{children}</div>
        </AvatarGroupContext.Provider>
    );
}

export function AvatarGroupItem({
    children,
    className,
    tooltipClassName,
    animation: itemAnimation,
}: {
    children: React.ReactNode;
    className?: string;
    tooltipClassName?: string;
    animation?: 'default' | 'flip' | 'reveal';
}) {
    const context = React.useContext(AvatarGroupContext);
    const [hovered, setHovered] = React.useState(false);
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0);
    const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
    const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

    const animation = itemAnimation ?? context?.animation ?? 'default';
    const finalTooltipClassName = tooltipClassName ?? context?.tooltipClassName;

    const tooltipChild = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === AvatarGroupTooltip,
    );
    const otherChildren = React.Children.toArray(children).filter(
        (child) => !(React.isValidElement(child) && child.type === AvatarGroupTooltip),
    );
    const tooltipContent = tooltipChild && React.isValidElement(tooltipChild)
        ? (tooltipChild.props as { children: React.ReactNode }).children
        : null;

    const variants = {
        default: {
            initial: { opacity: 0, y: 20, scale: 0.6 },
            animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 10 } },
            exit: { opacity: 0, y: 20, scale: 0.6, transition: { duration: 0.2, ease: 'easeInOut' as const } },
        },
        flip: {
            initial: { opacity: 0, rotateX: -90 },
            animate: { opacity: 1, rotateX: 0, transition: { type: 'spring' as const, stiffness: 180, damping: 25 } },
            exit: { opacity: 0, rotateX: -90, transition: { duration: 0.3, ease: 'easeInOut' as const } },
        },
        reveal: {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1, transition: { duration: 0.15, ease: 'easeOut' as const } },
            exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1, ease: 'easeIn' as const } },
        },
    };
    const v = variants[animation];

    return (
        <div
            className={cn('group relative', className)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <AnimatePresence mode="wait">
                {hovered && tooltipContent && (
                    <motion.div
                        initial={v.initial}
                        animate={v.animate}
                        exit={v.exit}
                        style={{
                            translateX: animation === 'reveal' ? 0 : translateX,
                            rotate: animation === 'reveal' ? 0 : rotate,
                            whiteSpace: 'nowrap',
                            transformOrigin: 'center',
                        }}
                        className={cn(
                            'absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs font-medium text-white shadow-xl',
                            finalTooltipClassName,
                        )}
                    >
                        {tooltipContent}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                className="relative cursor-pointer"
                whileHover={{ zIndex: 30 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onMouseMove={(e) => {
                    const half = (e.currentTarget as HTMLElement).offsetWidth / 2;
                    x.set(e.nativeEvent.offsetX - half);
                }}
            >
                {otherChildren}
            </motion.div>
        </div>
    );
}

export function AvatarGroupTooltip({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn('hidden relative z-30', className)}>{children}</div>
    );
}
