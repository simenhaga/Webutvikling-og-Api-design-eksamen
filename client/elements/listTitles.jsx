import { useLoading } from "../utils/useLoading";
import { fetchJSON } from "../utils/fetchJSON";
import React from "react";

export function ListTitles() {
  const { loading, error, data } = useLoading(async () =>
    fetchJSON("/api/articles")
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h2>Articles</h2>
      {data.map((article) => (
        <p>{article.title}</p>
      ))}
    </div>
  );
}
