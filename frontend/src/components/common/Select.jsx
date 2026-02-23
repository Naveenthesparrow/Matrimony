import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, AlertCircle } from 'lucide-react';

const Select = forwardRef(({
    label,
    options = [],
    error,
    required = false,
    className = '',
    ...props
}, ref) => {
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
                <select
                    ref={ref}
                    className={`
            w-full px-5 py-4
            border-2 rounded-xl appearance-none
            ${error
                            ? 'border-red-500 focus:border-red-600 focus:ring-red-500/20'
                            : 'border-royal-200 focus:border-royal-400 focus:ring-royal-500/20'
                        }
            bg-white text-gray-900 font-medium text-lg
            focus:outline-none focus:ring-4
            transition-all duration-300
            ${className}
          `}
                    {...props}
                >
                    <option value="">Select Option</option>
                    {options.map((opt) => (
                        <option key={opt.value || opt} value={opt.value || opt}>
                            {opt.label || opt}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-royal-400">
                    <ChevronDown className="w-5 h-5" />
                </div>
            </div>
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
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
