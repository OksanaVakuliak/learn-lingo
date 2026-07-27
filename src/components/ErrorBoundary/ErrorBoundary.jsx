import { Component } from 'react';
import Container from '../Container/Container';
import Button from '../Button/Button';
import Highlight from '../Highlight/Highlight';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Rendering failed', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <section className={styles.section}>
        <Container>
          <div className={styles.panel}>
            <h1 className={styles.title}>
              Something went <Highlight>wrong</Highlight>
            </h1>

            <p className={styles.description}>
              We could not display this content. Try again — if the problem
              stays, reload the page a bit later.
            </p>

            <Button onClick={this.handleRetry} className={styles.cta}>
              Try again
            </Button>
          </div>
        </Container>
      </section>
    );
  }
}

export default ErrorBoundary;
