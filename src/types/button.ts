
export type VariantButton = "primary" | "secondary" | "danger";

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: VariantButton;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isDisabled?: boolean;
  isLoading?: boolean;
  rounded?: boolean;
  fullRounded?: boolean;
  fullWidth?: boolean;
}