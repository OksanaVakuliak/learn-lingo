import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import styles from './Modal.module.css';

function Modal({ title, description, onClose, children }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const backdropPressed = useRef(false);
  const triggerRef = useRef(document.activeElement);

  useEffect(() => {
    const previouslyFocused = triggerRef.current;
    const initialOverflow = document.body.style.overflow;
    const root = document.getElementById('root');

    document.body.style.overflow = 'hidden';
    root.inert = true;

    if (!dialogRef.current.contains(document.activeElement)) {
      dialogRef.current.focus();
    }

    return () => {
      document.body.style.overflow = initialOverflow;
      root.inert = false;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropMouseDown = (event) => {
    backdropPressed.current = event.target === event.currentTarget;
  };

  const handleBackdropClick = (event) => {
    if (backdropPressed.current && event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={handleBackdropMouseDown}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="close" size={24} />
        </button>

        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>

        {description && <p className={styles.description}>{description}</p>}

        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
