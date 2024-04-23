'use client'
export default function Error({ error }) {
  return (
    <main className="error">
      <h1>Failed To create meal </h1>

      <p>{error.message}</p>
    </main>
  );
}
