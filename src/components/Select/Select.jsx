import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './Select.module.css';

const OPEN_KEYS = ['ArrowDown', 'ArrowUp', 'Enter', ' '];

function Select({ label, value, options, placeholder, onChange, className }) {
  const labelId = useId();
  const triggerId = useId();
  const listId = useId();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const items = useMemo(
    () => [{ value: '', label: placeholder }, ...options],
    [options, placeholder]
  );

  const selectedIndex = Math.max(
    items.findIndex((item) => item.value === value),
    0
  );
  const selected = items[selectedIndex];
  const isActive = (index) => index >= 0 && index < items.length;
  const current = isActive(activeIndex) ? activeIndex : selectedIndex;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event) => {
      if (!rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      listRef.current.children[current].scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, current]);

  const openMenu = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const selectOption = (index) => {
    onChange(items[index].value);
    setIsOpen(false);
    triggerRef.current.focus();
  };

  const moveActive = (offset) =>
    setActiveIndex((previous) => {
      const base = isActive(previous) ? previous : selectedIndex;

      return Math.min(Math.max(base + offset, 0), items.length - 1);
    });

  const handleKeyDown = (event) => {
    if (!isOpen) {
      if (OPEN_KEYS.includes(event.key)) {
        event.preventDefault();
        openMenu(selectedIndex);
      }

      return;
    }

    switch (event.key) {
      case 'Escape':
      case 'Tab':
        setIsOpen(false);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectOption(current);
        break;
      case 'ArrowDown':
        event.preventDefault();
        moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveActive(-1);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(items.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={rootRef}
      className={[styles.field, className].filter(Boolean).join(' ')}
    >
      <span id={labelId} className={styles.label}>
        {label}
      </span>

      <div className={styles.control}>
        <button
          id={triggerId}
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-labelledby={`${labelId} ${triggerId}`}
          aria-activedescendant={isOpen ? `${listId}-${current}` : undefined}
          onClick={() => (isOpen ? setIsOpen(false) : openMenu(-1))}
          onKeyDown={handleKeyDown}
        >
          <span className={styles.value}>
            {selected.selectedLabel ?? selected.label}
          </span>

          <Icon name="chevron-down" size={20} className={styles.icon} />
        </button>

        {isOpen && (
          <ul
            id={listId}
            ref={listRef}
            className={styles.menu}
            role="listbox"
            aria-labelledby={labelId}
          >
            {items.map((item, index) => (
              <li
                key={item.value}
                id={`${listId}-${index}`}
                className={[
                  styles.option,
                  index === selectedIndex && styles.selected,
                  index === activeIndex && styles.active,
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="option"
                aria-selected={index === selectedIndex}
                onClick={() => selectOption(index)}
                onMouseMove={() => setActiveIndex(index)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Select;
