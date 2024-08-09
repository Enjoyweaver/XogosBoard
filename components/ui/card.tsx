import React, { ReactNode } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <h3 className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
