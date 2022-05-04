import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function Frontpage() {
  return (
    <div className="container">
      <header>
        <div>Hello header</div>
      </header>

      <nav>
        <div>Hello nav</div>
      </nav>

      <main>
        <div>Hello main</div>
      </main>
    </div>
  );
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
