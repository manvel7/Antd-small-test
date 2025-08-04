/**
 * Prevent number field value change on mouse wheel scroll
 * This is useful for number inputs to prevent accidental value changes
 * @param event - Wheel event
 */
export const onWheelPreventChangeNumberField = (
  event: React.WheelEvent<HTMLInputElement>
) => {
  // Prevent the default wheel behavior on number inputs
  event.currentTarget.blur();

  // You can also prevent the event from bubbling up
  event.preventDefault();
};

/**
 * Alternative implementation that prevents wheel events more strictly
 * @param event - Wheel event
 */
export const preventWheelChange = (
  event: React.WheelEvent<HTMLInputElement>
) => {
  event.preventDefault();
  event.stopPropagation();
};
