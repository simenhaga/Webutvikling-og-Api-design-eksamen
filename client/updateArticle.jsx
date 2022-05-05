import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJSON } from "./utils/fetchJSON";

export function UpdateArticle() {
  const topics = [
    "Sport",
    "Økonomi",
    "Kultur",
    "Rampelys",
    "Utenriks",
    "Innenriks",
    "Teknologi",
  ];

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [author, setAuthor] = useState("");
  const [article_text, setArticle_text] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetchJSON("/api/articles/update", {
      method: "put",
      json: { title, topic, author, article_text },
    });
    setTitle("");
    setTopic("");
    setAuthor("");
    setArticle_text("");
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Article</h1>
      <div>
        Choose an article to update:
        <select name={"titles"}>
          {titles.map((t) => (
            <option value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        Author:
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        Title:
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        Topic:
        <select name={"topic"} onChange={(e) => setTopic(e.target.value)}>
          {topics.map((t) => (
            <option value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>Text:</div>
      <div>
        <textarea
          value={article_text}
          onChange={(e) => setArticle_text(e.target.value)}
        />
      </div>
      <button>Submit</button>
    </form>
  );
}
