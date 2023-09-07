import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'

type buttonVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'ghost'
  | 'success_filled'
  | 'danger_filled'
  | 'primary_filled'
  | 'icon_filled'
  | 'icon_unfilled'
  | 'warning_filled'
  | 'icon_text_filled'
  | 'icon_text_unfilled'
type buttonSize = 'base' | 'large' | 'small' | 'tiny'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize
  variant?: buttonVariant
  children: ReactNode
}

export default function Button({
  size = 'base',
  variant = 'primary_filled',
  children,
  className,
  ...props
}: Props) {
  const sizeClasses = {
    base: 'px-4 py-2',
    large: 'px-6 py-3',
    small: 'px-2 py-1',
    tiny: 'px-1 py-1 text-xs'
  }

  const variantClasses = {
    success:
      'border-2  border-green-500 dark:text-violet3 hover:bg-green-600 hover:border-green-600 hover:text-violet3 capitalize',
    warning:
      'border-2 border-orange-200 dark:text-violet3 hover:bg-orange-300 hover:border-orange-200 hover:text-violet3 capitalize',
    danger:
      'border-2 border-red-500 dark:text-violet3 hover:bg-red-600 hover:border-red-600 hover:text-violet3 capitalize',
    primary:
      'border-2  border-blue-500 capitalize dark:text-violet3 hover:bg-blue-600 hover:border-blue-600 hover:text-violet3 capitalize',
    ghost:
      'hover:bg-violet4 dark:hover:bg-violet4_dark hover:text-violet30 capitalize',
    success_filled:
      'border-2 bg-green-500 border-green-500 text-violet3 hover:bg-green-600 hover:border-green-600 capitalize',
    warning_filled:
      'border-2 bg-orange-500 border-orange-500  hover:bg-orange-300 hover:border-orange-300 capitalize ',
    danger_filled:
      'border-2 bg-red-500 border-red-500 text-violet3 hover:bg-red-600 hover:border-red-600 capitalize',
    primary_filled:
      'border-2 bg-blue-500 border-blue-500 text-violet3 hover:bg-blue-600 hover:border-blue-600',
    icon_filled:
      'border-2 bg-violet3 dark:bg-violet4_dark text-violet12 dark:text-violet3 hover:bg-violet4 dark:hover:bg-violet4_dark',
    icon_unfilled:
      'font-semibold text-violet12 hover:bg-violet4 dark:hover:bg-violet3_dark dark:text-violet3',
    icon_text_filled:
      'border-2 bg-violet3 dark:bg-violet3_dark  text-violet12 dark:text-violet1 hover:bg-violet4 dark:hover:bg-violet4_dark hover:bg-slate-600 hover:border-slate-600 capitalize flex flex-row items-center gap-2',
    icon_text_unfilled:
      'font-semibold  hover:bg-violet4 dark:hover:bg-violet4_dark capitalize dark:text-violet3 flex flex-row items-center gap-2'
  }
  return (
    <button
      className={clsx(
        'disabled:hover:text-violet30 flex h-fit w-fit flex-row items-center gap-2 rounded-md text-xs font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}