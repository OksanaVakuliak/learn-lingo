import styles from './Button.module.css';

function Button({
  variant = 'accent',
  type = 'button',
  className,
  children,
  ...props
}) {
  const variantClass = styles[variant] ?? styles.accent;
  const classes = [styles.button, variantClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
