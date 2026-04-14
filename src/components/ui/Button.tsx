import { Link } from "react-router";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  to: string;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = "primary",
  to,
  onClick,
}: ButtonProps) => {
  const className = `btn btn--${variant}`;

  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default Button;