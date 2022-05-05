import { useLoading } from "../utils/useLoading";
import { fetchJSON } from "../utils/fetchJSON";
import React from "react";

export function ListTopics() {
  const { loading, error, data } = useLoading(async () =>
    fetchJSON("/api/articles/topics")
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
      <h2>Topics</h2>
      {data.map((topic) => (
        <li>
          {topic._id} ({topic.total})
        </li>
      ))}
    </div>
  );
}
