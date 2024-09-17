import React from "react";

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextArea = React.forwardRef<HTMLInputElement, TextAreaProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div>
        {!!label && <p className="mb-2">{label}</p>}
        <textarea
          type={type}
          className={`bg-transparent border-2 border-gray-300 rounded-md py-2 px-4 ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default TextArea;
