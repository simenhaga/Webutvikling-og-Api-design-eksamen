import ReactDOM from "react-dom";
import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { fetchJSON } from "./utils/fetchJSON";
import { AddNewArticle } from "./addNewArticle";
import { UpdateArticle } from "./updateArticle";
import { ListArticles } from "./listArticles";
import { ListTitles } from "./listTitles";
import { ListTopics } from "./listTopics";

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
              <Link id="updateArticle" to={"/articles/update"}>
                Update article
              </Link>
            </div>
          )}
          {!userinfo && (
            <div>
              <Link id="login" to={"/login"}>
                Log in
              </Link>
            </div>
          )}
          {userinfo && (
            <div>
              <button id="logout" onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </header>

      <nav>
        <div id="wrapper">
          <div>{ListTopics()}</div>
        </div>
        <div>{ListTitles()}</div>
      </nav>

      <main>
        {userinfo && <div className={"letter"}>{ListArticles()}</div>}
      </main>
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
