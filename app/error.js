'use client';

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
      {process.env.NODE_ENV === 'development' && (
        <pre>{error.message}</pre>
      )}
    </div>
  );
}