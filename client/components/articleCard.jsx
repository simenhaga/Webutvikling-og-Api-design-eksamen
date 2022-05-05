import React from "react";

export function ArticleCard({
  article: { title, author, topic, article_text },
}) {
  return (
    <>
      <div className="articleCard">
        <h3>{title}</h3>
        <div>
          av <strong>{author}, </strong>
          <em>{topic}</em>
        </div>
        <article>{article_text}</article>
      </div>
    </>
  );
}
