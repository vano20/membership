
export type VariantButton = "primary" | "secondary" | "danger";

export type ButtonProps = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: VariantButton;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isDisabled?: boolean;
  isLoading?: boolean;
  rounded?: boolean;
  fullRounded?: boolean;
  fullWidth?: boolean;
};