import styles from './alert.module.css';
import cn from 'classnames';

// A component demonstrating usage of the classnames package.
export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
    >
      {children}
    </div>
  );
}
