import { useLoading } from "./utils/useLoading";
import { fetchJSON } from "./utils/fetchJSON";
import { ArticleCard } from "./components/articleCard";
import React from "react";

export function ListArticles() {
  const { loading, error, data } = useLoading(async () =>
    fetchJSON("/api/articles/verifiedUser")
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
      {data.map((article) => (
        <ArticleCard key={article.title} article={article} />
      ))}
    </div>
  );
}
