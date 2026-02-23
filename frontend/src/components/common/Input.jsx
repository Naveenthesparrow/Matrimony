import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Input = forwardRef(({ 
  label,
  error,
  success,
  icon: Icon,
  type = 'text',
  className = '',
  required = false,
  disabled = false,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className="w-full mb-6">
      {label && (
        <motion.label 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="block text-sm font-bold text-royal-900 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-royal-400" />
          </div>
        )}
        <motion.input
          ref={ref}
          type={inputType}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full ${Icon ? 'pl-12' : 'pl-5'} pr-12 py-4
            border-2 rounded-xl
            ${error 
              ? 'border-red-500 focus:border-red-600' 
              : success
              ? 'border-trust-500 focus:border-trust-600'
              : isFocused
              ? 'border-royal-500 focus:border-gold-500'
              : 'border-royal-200 focus:border-royal-400'
            }
            bg-white backdrop-blur
            text-gray-900 placeholder:text-gray-400
            focus:outline-none focus:ring-4 
            ${error 
              ? 'focus:ring-red-500/20' 
              : success
              ? 'focus:ring-trust-500/20'
              : 'focus:ring-royal-500/20'
            }
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            font-medium text-lg
            ${className}
          `}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        
        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-royal-400 hover:text-royal-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
        
        {/* Success/Error Icons */}
        {!disabled && (success || error) && type !== 'password' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {success && <CheckCircle className="w-5 h-5 text-trust-500" />}
            {error && <AlertCircle className="w-5 h-5 text-red-500" />}
          </div>
        )}
      </div>
      
      {/* Error/Success Messages */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600 font-semibold flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.p>
      )}
      
      {success && !error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-trust-600 font-semibold flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          {success}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
