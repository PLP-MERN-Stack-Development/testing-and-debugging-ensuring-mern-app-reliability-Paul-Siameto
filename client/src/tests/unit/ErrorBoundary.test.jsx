import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary';

function ProblemChild() {
  throw new Error('Boom');
}

describe('ErrorBoundary', () => {
  it('renders fallback UI on error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('calls logger when error occurs', () => {
    const logger = { error: jest.fn() };
    render(
      <ErrorBoundary logger={logger}>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(logger.error).toHaveBeenCalled();
  });

  it('resets when retry button clicked', () => {
    const onReset = jest.fn();
    render(
      <ErrorBoundary onReset={onReset}>
        <ProblemChild />
      </ErrorBoundary>,
    );

    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(onReset).toHaveBeenCalled();
  });
});

