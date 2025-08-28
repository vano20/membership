
export type Variant = "primary" | "secondary" | "danger";

export type ButtonProps = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: Variant;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isDisabled?: boolean;
  isLoading?: boolean;
  rounded?: boolean;
  fullRounded?: boolean;
  fullWidth?: boolean;
};