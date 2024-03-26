// In react-dom.d.ts

// Import React types if necessary
import * as React from 'react';

// Augment the 'react-dom' module to include the createRoot function
declare module 'react-dom' {
  interface Root {
    render(element: React.ReactNode): void;
  }

  export function createRoot(container: Element | Document | DocumentFragment | null, options?: { hydrate?: boolean }): Root;
}
