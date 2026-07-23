import styles from './Button.module.css';

function Button({
  variant = 'accent',
  type = 'button',
  className,
  children,
  ...props
}) {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
