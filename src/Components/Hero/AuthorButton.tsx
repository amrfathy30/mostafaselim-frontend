import * as React from "react";

interface AuthorButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function AuthorButton({
  children,
  variant = "secondary",
  className = ""
}: AuthorButtonProps) {
  const baseClasses = "flex gap-2.5 justify-center items-center px-12 py-4 text-xl text-center rounded-md shadow-sm w-[232px] max-md:px-5";

  const variantClasses = {
    primary: "text-white bg-sky-500",
    secondary: "text-white border-2 border-solid border-neutral-100"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <span className="my-auto">{children}</span>
    </button>
  );
}
