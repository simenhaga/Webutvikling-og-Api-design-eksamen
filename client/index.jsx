import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Frontpage() {
  return (
    <div className="container">
      <header>
        <div>Hello header</div>
      </header>

      <nav>
        <div>Hello nav</div>
        <div>{ListTitles()}</div>
      </nav>

      <main>
        <div>Hello main</div>
        <div>{ListArticles()}</div>
      </main>
    </div>
  );
}

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    method: options.method || "get",
    headers: options.json ? { "content-type": "application/json" } : {},
    body: options.json && JSON.stringify(options.json),
  });
  if (!res.ok) {
    throw new Error(`Failed ${res.status}: ${(await res).statusText}`);
  }
  if (res.status === 200) {
    return await res.json();
  }
}

function ArticleCard({
  article: { title, date, author, topic, article_text },
}) {
  return (
    <>
      <h3>{title}</h3>
      <div>
        {author}, {date}
      </div>
      <article>{article_text}</article>
    </>
  );
}

function ListArticles() {
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

function ListTitles() {
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
        <h3>{article.title}</h3>
      ))}
    </div>
  );
}

function useLoading(loadingFunction) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  async function load() {
    try {
      setLoading(true);
      setData(await loadingFunction());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  return { loading, error, data };
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Frontpage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
