import React from "react";

export const Alert = ({ className, children, ...props }) => {
  return (
    <div
      className={`bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertTitle = ({ className, children, ...props }) => {
  return (
    <h4 className={`font-bold mb-2 ${className}`} {...props}>
      {children}
    </h4>
  );
};

export const AlertDescription = ({ className, children, ...props }) => {
  return (
    <p className={`${className}`} {...props}>
      {children}
    </p>
  );
};
