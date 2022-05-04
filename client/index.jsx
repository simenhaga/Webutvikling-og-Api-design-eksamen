import ReactDOM from "react-dom";
import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

const ProfileContext = React.createContext({
  userinfo: undefined,
});

function Frontpage({ reload }) {
  const { userinfo } = useContext(ProfileContext);

  async function handleLogout() {
    await fetch("/api/login", { method: "delete" });
    reload();
  }

  return (
    <div className="container">
      <header>
        <div id="wrapper">
          <div>
            <h1 id="appName">FakeNews</h1>
          </div>
          {userinfo && (
            <div>
              <Link id="profileName" to={"/profile"}>
                Hei {userinfo.name}!
              </Link>
            </div>
          )}
          {userinfo && (
            <div>
              <Link id="addArticle" to={"/articles/new"}>
                New article
              </Link>
            </div>
          )}
          {userinfo && (
            <div>
              <Link id="addArticle" to={"/articles/update"}>
                Update article
              </Link>
            </div>
          )}
          <div>
            <Link id="login" to={"/login"}>
              Log in
            </Link>
          </div>
          {userinfo && (
            <div>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>
      </header>

      <nav>
        <div id="wrapper">
          <div>{topicsCard()}</div>
        </div>
        <div>{ListTitles()}</div>
      </nav>

      <main>{userinfo && <div>{ListArticles()}</div>}</main>
    </div>
  );
}

function Profile() {
  const { userinfo } = useContext(ProfileContext);

  return (
    <>
      <h1>
        User profile: {userinfo.name} ({userinfo.email})
      </h1>
      {userinfo.picture && (
        <img src={userinfo.picture} alt={userinfo.name + " profile picture"} />
      )}
    </>
  );
}

function Login() {
  const { oauth_config } = useContext(ProfileContext);
  useEffect(async () => {
    const { discovery_url, client_id, scope } = oauth_config;
    const discoveryDocument = await fetchJSON(discovery_url);
    const { authorization_endpoint } = discoveryDocument;
    const params = {
      response_type: "token",
      response_mode: "fragment",
      scope,
      client_id,
      redirect_uri: window.location.origin + "/login/callback",
    };
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(params);
  }, []);
  return <h1>Please wait</h1>;
}

function LoginCallback({ reload }) {
  const navigate = useNavigate();
  async function test() {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
    const res = await fetch("/api/login", {
      method: "post",
      body: new URLSearchParams({ access_token }),
    });
    if (res.ok) {
      reload();
      navigate("/");
    }
  }
  useEffect(() => {
    test();
  });
  return <h1>Please wait</h1>;
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

function topicsCard() {
  const topics = [
    "Sport",
    "Økonomi",
    "Kultur",
    "Rampelys",
    "Utenriks",
    "Innenriks",
    "Teknologi",
  ];

  return (
    <>
      <div className="topicsCard">
        <div>
          <h3>Topics</h3>
          <select name={"topic"}>
            <option value="none" selected disabled hidden>
              Select an Option
            </option>
            {topics.map((t) => (
              <option value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

function AddNewArticle() {
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
    await fetchJSON("/api/articles/new", {
      method: "post",
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
      <h1>Add Article</h1>
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

function UpdateArticle() {
  return (
    <div>
      <h1>Update article</h1>
      <p>This page is under construction....</p>
    </div>
  );
}

function Application() {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState();
  useEffect(loadLoginInfo, []);

  async function loadLoginInfo() {
    setLoading(true);
    setLogin(await fetchJSON("/api/login"));
    setLoading(false);
  }

  useEffect(() => {
    console.log({ login });
  }, [login]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContext.Provider value={login}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Frontpage reload={loadLoginInfo} />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/articles/new"} element={<AddNewArticle />} />
          <Route path={"/articles/update"} element={<UpdateArticle />} />
          <Route
            path={"/login/callback"}
            element={<LoginCallback reload={loadLoginInfo} />}
          />
        </Routes>
      </BrowserRouter>
    </ProfileContext.Provider>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
