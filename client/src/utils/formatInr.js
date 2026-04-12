/**
 * Formats stored numeric prices as Indian Rupees for UI copy.
 * `0` is shown as "Free" for open-registration style events.
 */
export function formatInr(price) {
  if (price === 0) return 'Free';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}
