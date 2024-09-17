import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div>
        {!!label && <p className="mb-2">{label}</p>}
        <input
          type={type}
          className={`bg-transparent border-2 border-gray-300 rounded-md py-2 px-4 ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export { Input };
