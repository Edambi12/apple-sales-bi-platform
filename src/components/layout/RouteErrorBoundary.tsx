import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Keeps a failing page (e.g. a chunk that cannot load) from blanking the app. */
export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page failed to render:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div role="alert" className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-semibold">This page could not be displayed</h1>
        <p className="max-w-md text-muted-foreground">
          Something went wrong while loading this page. The rest of the site is
          still available.
        </p>
        <a href="/" className="font-medium text-primary underline underline-offset-4">
          Back to the case study
        </a>
      </div>
    );
  }
}
