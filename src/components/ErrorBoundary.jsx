import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return <div className="page-shell standard-page"><div className="empty-state"><h1>Something unexpected happened.</h1><p>Please refresh the page or return to the home page.</p><a className="primary-button" href="/">Return home</a></div></div>
    return this.props.children
  }
}
