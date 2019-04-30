import React from "react";

export class SuppressErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    // do nothing to suppress errors
  }

  render() {
    return this.props.children; 
  }
}