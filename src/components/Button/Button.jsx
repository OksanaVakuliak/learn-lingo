import styles from './Button.module.css';

function Button({
  as: Component = 'button',
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
    <Component
      type={Component === 'button' ? type : undefined}
      className={classes}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
