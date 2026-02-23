import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed gap-2';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-primary-500/30',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-secondary-500/30',
    outline: 'bg-transparent text-primary-600 border-2 border-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500/30',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500/30',
    white: 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 shadow-md hover:shadow-lg focus:ring-gray-500/30',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-red-500/30',
    success: 'bg-gradient-to-r from-trust-500 to-trust-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-trust-500/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={18} />}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
};

export default Button;
