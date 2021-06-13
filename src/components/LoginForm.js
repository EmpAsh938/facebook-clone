import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { auth } from "../firebase";
import { loggedIn } from "../redux/postSlice";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  height: 300px;
  width: 340px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 2em 1em;
  padding-bottom: 0;
  & > input {
    border: none;
    outline: none;
    border-radius: 4px;
    font-size: 1.1rem;
    padding: 0.5em;
  }
  & > button {
    font-size: 1.2rem;
    color: #fff;
    background-color: #3470ff;
    border: none;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    border-radius: 30px;
    transition: all 0.3s linear;
    &:hover {
      cursor: pointer;
      background-color: #1d61b5;
    }
  }
  & > p {
    color: #333;

    & > span {
      font-weight: 700;
      & > a {
        text-decoration: none;
        color: #1d3fb5;
        color: green;
      }
    }
  }
  @media screen and (min-width: 900px) {
    margin-top: 2em;
  }
`;

const Error = styled.p`
  :first-of-type {
    color: red;
    background: red;
    text-align: center;
    color: #fff;
    padding: 1em 0em;
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          dispatch(loggedIn());
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setError(true);
          setErrorMessage(error.message);
        });
    } else {
      setError(true);
      setErrorMessage("Some fields are empty!");
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setError(false);
      setErrorMessage("");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  return (
    <FormWrapper onSubmit={handleClick}>
      {error && <Error>{errorMessage}</Error>}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleClick}>Log In</button>
      <p>
        New to <span>Facebook</span>?{" "}
        <span>
          <Link to="/signup">Create New Account</Link>
        </span>
      </p>
    </FormWrapper>
  );
};

export default LoginForm;
