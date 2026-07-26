import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import styles from './Modal.module.css';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]';

function isReachable(element) {
  return Boolean(
    element?.isConnected &&
      element.checkVisibility({ visibilityProperty: true }) &&
      element.matches(FOCUSABLE)
  );
}

function findReturnTarget(trigger, fallback) {
  if (isReachable(trigger)) {
    return trigger;
  }

  if (!fallback) {
    return null;
  }

  return [fallback, ...fallback.querySelectorAll(FOCUSABLE)].find(isReachable);
}

function Modal({ title, description, onClose, returnFocusRef, children }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const backdropPressed = useRef(false);
  const triggerRef = useRef(document.activeElement);

  useEffect(() => {
    const previouslyFocused = triggerRef.current;
    const fallbackFocused = returnFocusRef?.current;
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

      findReturnTarget(previouslyFocused, fallbackFocused)?.focus();
    };
  }, [returnFocusRef]);

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
