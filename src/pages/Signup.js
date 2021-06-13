import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import styled from "styled-components";
import { loggedIn } from "../redux/postSlice";

const Wrapper = styled.section`
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 0 1em;
  & > form {
    height: 500px;
    max-width: 500px;
    width: 100%:
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 1em;
    & > div:first-of-type {
      border-bottom: 1px solid rgba(0,0,0,.2);
      padding-bottom: .5em;
      h2 {
        font-size: 2rem;
      }
      p {
        color:#555;
      }
    }
    & > div:last-of-type {
      display: flex;
      flex-direction: column;
      gap: 1em;
      & > div {
        display: flex;
        gap: .5em;
        & > * {
          width: 100%;
        }
      }
      & input {
        border: 1px solid rgba(0,0,0,.2);
        font-size: 1.1rem;
        padding: .3em .5em;
        :focus {
          outline: 1px solid green;
        }
      }
      & > p {
        color: gray;
        & span {
          font-weight: 600;
          color: green;
          & > a {
            color: green;
            text-decoration: none;

          }
        }
      }
      & > button {
        font-size: 1.2rem;
        width: 200px;
        margin: auto;
        color: #fff;
        background-color: green;
        padding: .8em 0;
        border: none;
        border-radius: 30px;
        &:hover {
          cursor: pointer;
          opacity: .95;
        }
      }
    }
  }
`;

const Error = styled.p`
  background: orange;
  padding: 0.5em 0;
  text-align: center;
  color: #fff !important;
  font-weight: 600;
`;

const Logout = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = fName + " " + lName;
    if (fName && lName && email && password) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          return userCredential.user.updateProfile({
            displayName: fullName,
          });
        })
        .then(() => {
          dispatch(loggedIn());
        })
        .catch((error) => {
          setError(true);
          setErrorMessage(error.message);
        });
    } else {
      setError(true);
      setErrorMessage("Fill the form and try again.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
      setErrorMessage("");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Sign Up</h2>
          <p>It's quick and easy.</p>
        </div>
        <div>
          {error && <Error>{errorMessage}</Error>}
          <div>
            <input
              type="text"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              placeholder="First name"
            />
            <input
              type="text"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              placeholder="Last name"
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
          />
          <p>
            Already have an account?{" "}
            <span>
              <Link to="signin">Log In</Link>
            </span>
          </p>
          <button onClick={handleSubmit}>Sign Up</button>
          <p>
            By clicking Sign Up, you agree to our{" "}
            <span>Terms. Data Policy</span> and <span>Cookie Policy</span>. You
            may receive sms from us and can opt out any time.
          </p>
        </div>
      </form>
    </Wrapper>
  );
};

export default Logout;
