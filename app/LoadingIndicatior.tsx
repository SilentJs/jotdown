import { useState } from 'react';
 // Import your loading indicator component

function LoadingBoundary({ children }) {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <>
      {loading ? (
        '<LoadingIndicator />'
      ) : (
        <>
          {/* Render children if not loading */}
          {children}
        </>
      )}
    </>
  );
}

export default LoadingBoundary;