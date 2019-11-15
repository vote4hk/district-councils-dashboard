import React from 'react'

export default function withQuery(Component, { query, variables }, converter) {
  function WrappedComponent({ data }) {
    return <Component {...converter(data)} />
  }

  WrappedComponent.query = query
  WrappedComponent.variables = variables

  return WrappedComponent
}
