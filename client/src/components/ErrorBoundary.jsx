import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    const { logger } = this.props;
    logger?.error('React error boundary caught an error', { error, info });
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something went wrong.</h2>
          <p>Try refreshing the page or contact support if the issue persists.</p>
          <button type="button" onClick={this.handleReset}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  logger: PropTypes.shape({
    error: PropTypes.func,
  }),
  onReset: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  logger: console,
  onReset: undefined,
};

export default ErrorBoundary;

