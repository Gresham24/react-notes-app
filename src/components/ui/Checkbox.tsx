import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={`w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 ${className}`}
        {...props}
      />
      <label className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};