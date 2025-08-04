/**
 * Format number for price fields
 * @param value - The value to format
 * @returns Formatted number string or original value
 */
export const formatNumber = (value: any): string | number => {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  const numValue = Number(value);

  if (isNaN(numValue)) {
    return value;
  }

  // Format with commas for thousands separator
  return numValue.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
};

/**
 * Parse formatted number string back to number
 * @param value - The formatted string to parse
 * @returns Number value
 */
export const parseFormattedNumber = (value: string): number => {
  if (!value || typeof value !== 'string') {
    return 0;
  }

  // Remove commas and other formatting
  const cleanValue = value.replace(/[,\s]/g, '');
  const numValue = parseFloat(cleanValue);

  return isNaN(numValue) ? 0 : numValue;
};
