import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}
export function Input({
  label,
  error,
  helperText,
  className = '',
  ...props
}: InputProps) {
  return <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>}
      <input className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
          ${error ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-teal-500'}
          focus:outline-none focus:ring-4 focus:ring-teal-500/10
          ${className}`} {...props} />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
    </div>;
}