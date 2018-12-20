import React, { Component } from 'react';

import Oops from './views/Oops/index.js';

//https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error);
        console.log(info);
//        logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <Oops />;
        }

        return this.props.children;
    }
}
export default ErrorBoundary;
