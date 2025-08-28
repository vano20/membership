export type VariantBadge = 'yellow' | 'green' | 'red'

export interface BadgeProps {
  label?: string
  children?: React.ReactNode
  variant: VariantBadge
}
