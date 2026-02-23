import { useState, useEffect } from 'react';
import { FiPhone } from 'react-icons/fi';

const COUNTRY_CODES = {
  '+1': { flag: '🇺🇸', name: 'United States/Canada' },
  '+44': { flag: '🇬🇧', name: 'United Kingdom' },
  '+61': { flag: '🇦🇺', name: 'Australia' },
  '+65': { flag: '🇸🇬', name: 'Singapore' },
  '+91': { flag: '🇮🇳', name: 'India' },
  '+60': { flag: '🇲🇾', name: 'Malaysia' },
  '+971': { flag: '🇦🇪', name: 'UAE' },
};

const PhoneInputField = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  error = null,
}) => {
  const [detectedCountry, setDetectedCountry] = useState(null);

  // Detect country code as user types
  useEffect(() => {
    if (value && value.startsWith('+')) {
      // Check for multi-digit codes first (longer codes have priority)
      const sortedCodes = Object.keys(COUNTRY_CODES).sort((a, b) => b.length - a.length);
      
      for (const code of sortedCodes) {
        if (value.startsWith(code)) {
          setDetectedCountry({ code, ...COUNTRY_CODES[code] });
          return;
        }
      }
    }
    setDetectedCountry(null);
  }, [value]);

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    onChange({ target: { name, value: inputValue } });
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-bold text-royal-900 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiPhone className="text-gray-400" size={20} />
        </div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={handlePhoneChange}
          placeholder={placeholder || 'Enter phone number (e.g., +1 555-0100)'}
          required={required}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all focus:border-royal-500 focus:shadow-lg focus:shadow-royal-500/10 text-gray-900"
        />
        
        {/* Country Detector Badge */}
        {detectedCountry && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 border-2 border-green-300 rounded-full">
              <span className="text-xl">{detectedCountry.flag}</span>
              <span className="text-xs font-bold text-green-800">{detectedCountry.name}</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default PhoneInputField;
