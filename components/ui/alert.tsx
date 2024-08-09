import React, { ReactNode } from "react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  className = "",
  children,
  ...props
}) => {
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

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: ReactNode;
}

export const AlertTitle: React.FC<AlertTitleProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <h4 className={`font-bold mb-2 ${className}`} {...props}>
      {children}
    </h4>
  );
};

interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: ReactNode;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <p className={`${className}`} {...props}>
      {children}
    </p>
  );
};
