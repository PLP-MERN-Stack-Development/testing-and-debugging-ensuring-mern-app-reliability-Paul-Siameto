import React from 'react';
import clsx from 'clsx';

const variantClassMap = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
};

const sizeClassMap = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...rest
}) {
  const buttonClassName = clsx(
    'btn',
    variantClassMap[variant] || variantClassMap.primary,
    sizeClassMap[size] || sizeClassMap.md,
    disabled && 'btn-disabled',
    className,
  );

  return (
    <button className={buttonClassName} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

export default Button;

