import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from '@/lib/utils'

const Drawer = ({ shouldScaleBackground = true, ...props }) => (
    <DrawerPrimitive.Root
        shouldScaleBackground={shouldScaleBackground}
        {...props}
    />
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

type DrawerOverlayProps = React.ComponentPropsWithoutRef<'div'>

const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
    ({ className, ...props }, ref) => (
        <DrawerPrimitive.Overlay
            ref={ref}
            className={cn('bg-grey/80 fixed inset-0 z-50', className)}
            {...props}
        />
    )
)
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

type DrawerContentProps = {
    children: React.ReactNode
    classname: string
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
    ({ classname, children, ...props }, ref) => (
        <DrawerPortal>
            <DrawerOverlay />
            <DrawerPrimitive.Content
                ref={ref}
                className={cn(
                    'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto  flex-col rounded-t-[10px] border border-mako-grey-300 ',
                    classname
                )}
                {...props}
            >
                <div className="bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full " />
                {children}
            </DrawerPrimitive.Content>
        </DrawerPortal>
    )
)
DrawerContent.displayName = 'DrawerContent'

type DrawerHeaderProps = React.ComponentPropsWithoutRef<'div'>

const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
    <div
        className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
        {...props}
    />
)
DrawerHeader.displayName = 'DrawerHeader'

type DrawerFooterProps = React.ComponentPropsWithoutRef<'div'>

const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
    <div
        className={cn('mt-auto flex flex-col gap-2 p-4', className)}
        {...props}
    />
)
DrawerFooter.displayName = 'DrawerFooter'

type DrawerTitleProps = React.ComponentPropsWithoutRef<'div'>

const DrawerTitle = React.forwardRef<HTMLDivElement, DrawerTitleProps>(
    ({ className, ...props }, ref) => (
        <DrawerPrimitive.Title
            ref={ref}
            className={cn(
                'font-sans text-[24px] leading-none tracking-tight',
                className
            )}
            {...props}
        />
    )
)
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

type DrawerDescriptionProps = React.ComponentPropsWithoutRef<'div'>

const DrawerDescription = React.forwardRef<
    HTMLDivElement,
    DrawerDescriptionProps
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Description
        ref={ref}
        className={cn('text-muted-foreground text-sm', className)}
        {...props}
    />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
}
