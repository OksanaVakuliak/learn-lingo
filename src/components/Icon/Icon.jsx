function Icon({ name, size = 24, className, label }) {
  const href = `${import.meta.env.BASE_URL}sprite.svg#icon-${name}`;
  const a11y = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': 'true' };

  return (
    <svg width={size} height={size} className={className} {...a11y}>
      <use href={href} />
    </svg>
  );
}

export default Icon;
