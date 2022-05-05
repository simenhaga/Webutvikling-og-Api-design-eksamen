import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export function LoginCallback({ reload }) {
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
