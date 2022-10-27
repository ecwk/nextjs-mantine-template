import React from 'react';

// Can be used in sub-components to get the children of a parent component
export const getReactChildren = (name: string, children: React.ReactNode) =>
  React.Children.map(children, (child) => {
    if (
      React.isValidElement(child) &&
      typeof child.type !== 'string' &&
      child.type.name === name
    ) {
      return child;
    }
    return null;
  });
