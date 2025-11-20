import React from "react";
import type { LucideIcon } from "lucide-react"; // 👈 type-only import
import { motion } from "framer-motion";
import clsx from "clsx";

interface ButtonProps {
  label?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon: Icon,
  iconPosition = "left",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-200 px-4 py-2 focus:outline-none";

  const variantStyles = {
    primary:
      "bg-[#2e2e2e] text-white hover:bg-[#1f1f1f] active:scale-95 disabled:opacity-50",
    secondary:
      "bg-white text-[#2e2e2e] border border-[#2e2e2e] hover:bg-[#2e2e2e]/10 active:scale-95 disabled:opacity-50",
  };

  const combinedClasses = clsx(baseStyles, variantStyles[variant], className);

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {Icon && iconPosition === "left" && <Icon size={18} />}
      {label && <span>{label}</span>}
      {Icon && iconPosition === "right" && <Icon size={18} />}
    </motion.button>
  );
};

export default Button;
