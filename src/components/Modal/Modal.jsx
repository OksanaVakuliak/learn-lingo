import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import styles from './Modal.module.css';

function Modal({ title, description, onClose, children }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const backdropPressed = useRef(false);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const initialOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    dialogRef.current.focus();

    return () => {
      document.body.style.overflow = initialOverflow;
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
