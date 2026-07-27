import { Component } from 'react';
import Container from '../Container/Container';
import Button from '../Button/Button';
import Highlight from '../Highlight/Highlight';
import styles from './ErrorBoundary.module.css';

const RETRIES_BEFORE_RELOAD = 2;

class ErrorBoundary extends Component {
  state = { hasError: false, retries: 0 };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Rendering failed', error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, retries: 0 });
    }
  }

  handleRetry = () => {
    this.setState((state) => ({ hasError: false, retries: state.retries + 1 }));
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const retriesSpent = this.state.retries >= RETRIES_BEFORE_RELOAD;

    return (
      <section className={styles.section}>
        <Container>
          <div className={styles.panel} role="alert">
            <h1 className={styles.title}>
              Something went <Highlight>wrong</Highlight>
            </h1>

            <p className={styles.description}>
              {retriesSpent
                ? 'Retrying did not help. Reload the page or come back a bit later.'
                : 'We could not display this content. Try again — if the problem stays, reload the page a bit later.'}
            </p>

            <Button
              onClick={retriesSpent ? this.handleReload : this.handleRetry}
              className={styles.cta}
            >
              {retriesSpent ? 'Reload page' : 'Try again'}
            </Button>
          </div>
        </Container>
      </section>
    );
  }
}

export default ErrorBoundary;
