// Optimized phone validation with memoization
const countryRules: { [key: string]: number[] } = {
  '374': [8], // Armenia: +374 XX XXX XXX
  '1': [10],   // US/Canada: +1 XXX XXX XXXX
  '44': [10, 11], // UK: +44 XXXX XXX XXX
  '49': [10, 11, 12], // Germany: varies
  '33': [9, 10], // France: +33 X XX XX XX XX
  '39': [9, 10, 11], // Italy: varies
  '7': [10], // Russia: +7 XXX XXX XXXX
  '81': [10, 11], // Japan: varies
  '86': [11], // China: +86 XXX XXXX XXXX
  '91': [10], // India: +91 XXXXX XXXXX
};

// Cache for phone validation results to avoid repeated calculations
const validationCache = new Map<string, boolean>();

export const validatePhoneNumber = (value: string | undefined): boolean => {
  if (!value) return false;

  // Check cache first
  if (validationCache.has(value)) {
    return validationCache.get(value)!;
  }

  // Remove all non-digit characters except +
  const cleanNumber = value.replace(/[^\d+]/g, '');

  // Must start with + for international format
  if (!cleanNumber.startsWith('+')) {
    validationCache.set(value, false);
    return false;
  }

  // Extract country code and number
  const numberWithoutPlus = cleanNumber.slice(1);

  // Check if it matches any known country pattern
  for (const [countryCode, validLengths] of Object.entries(countryRules)) {
    if (numberWithoutPlus.startsWith(countryCode)) {
      const phoneLength = numberWithoutPlus.length - countryCode.length;
      if (validLengths.includes(phoneLength)) {
        validationCache.set(value, true);
        return true;
      }
    }
  }

  // Fallback: general international format validation
  // Should be between 8-15 digits total (including country code)
  const isValid = numberWithoutPlus.length >= 8 && numberWithoutPlus.length <= 15;
  validationCache.set(value, isValid);

  return isValid;
};

// Clear cache periodically to prevent memory leaks
export const clearPhoneValidationCache = (): void => {
  validationCache.clear();
};
