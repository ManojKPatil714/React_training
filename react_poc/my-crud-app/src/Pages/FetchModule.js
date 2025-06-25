import React from 'react';
import { useFetch } from '../hooks/useFetch';


export default function FetchModule() {
  const { data, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;
  const safeData = Array.isArray(data) ? data : [];

  return (
    <section>
      <h2>Data Fetch (Custom Hook)</h2>
      <button onClick={() => refetch(true)}>Refetch (ignore cache)</button>
      <ul>
        {safeData.slice(0, 5).map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      {safeData.length === 0 && <p>No posts available.</p>}
    </section>
  );
}
