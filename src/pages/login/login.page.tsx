import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import "./login.style.css";
import { SIGN_IN_ADMIN } from "../../api";
import { useAuth } from "../../hooks";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [signInAdmin, { loading, error }] = useMutation(SIGN_IN_ADMIN);
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div>
        <h2 className="login-page__heading">Exams Remuneration</h2>
      </div>
      {error && (
        <div className="login-error">
          <p>{error.message}</p>
        </div>
      )}
      <form action="#">
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="login-btn__container">
          <a
            href="#"
            className="login-btn"
            onClick={(e) => {
              e.preventDefault();
              signInAdmin({
                variables: {
                  email,
                  password,
                },
              }).then(({ data }) => {
                login(data.signInAdministrator.token);
                navigate("/");
                setEmail("");
                setPassword("");
              });
            }}
          >
            {loading ? <ClipLoader size="20px" color="#fff" /> : <p>Login</p>}
          </a>
        </div>
      </form>
    </div>
  );
}
