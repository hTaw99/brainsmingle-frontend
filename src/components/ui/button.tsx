import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Spinner } from './spinner'

const buttonVariants = cva(
  'inline-flex items-center cursor-pointer justify-center rounded-[12px] gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-1000 text-white hover:bg-primary-1000/90 disabled:bg-primary-200',
        primaryOutline:
          'bg-transparent border border-primary-900 text-primary-900 hover:opacity-80',
        primaryLink:
          'bg-transparent text-primary-900 hover:opacity-80 disabled:text-primary-200',
        primaryPale:
          'bg-primary-100 border border-border hover:bg-border text-primary-900 disabled:border-primary-50 disabled:bg-primary-50 disabled:text-primary-400',

        secondary:
          'bg-secondary-1000 text-white hover:brightness-105 transition-all disabled:bg-secondary-200',
        secondaryPale:
          'bg-secondary-100 hover:bg-secondary-200/80 text-orange-400 disabled:bg-orange-50',
        warning:
          'text-secondary-1000 bg-white disabled:text-secondary-200 border border-primary-200 rounded rounded-xl',
        danger: 'bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300',
        ghost: 'hover:bg-primary-50 hover:text-accent-foreground',

        dangerPale:
          'bg-red-50 text-red-500 disabled:bg-red-300 hover:bg-red-100/80',
        success: 'border-0 bg-green-50 text-green-500',
      },
      size: {
        lg: 'h-[48px] px-[18px]',
        sm: 'h-[40px] px-[12px]',
        iconLg: 'size-[48px] rounded-[16px]',
        iconSm: 'size-[40px] rounded-xl [&_svg]:size-5',
        iconXs: 'size-[32px] rounded-lg [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loaderFallback?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      isLoading,
      loaderFallback,
      variant,
      size,
      children,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        type="button"
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {!isLoading
          ? children
          : (loaderFallback ?? (
              <Spinner
                className={cn(
                  'text-white',
                  variant === 'primaryOutline' && 'text-primary-900',
                )}
              />
            ))}
      </Comp>
    )
  },
)

export { Button, buttonVariants }
