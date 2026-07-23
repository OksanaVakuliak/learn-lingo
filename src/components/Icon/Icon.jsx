function Icon({ name, size = 24, className }) {
  const href = `${import.meta.env.BASE_URL}sprite.svg#icon-${name}`;

  return (
    <svg width={size} height={size} className={className} aria-hidden="true">
      <use href={href} />
    </svg>
  );
}

export default Icon;
