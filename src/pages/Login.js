/* eslint-disable no-useless-escape */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./css/auth.css";
import { BiLoaderAlt } from "react-icons/bi";
import useValidateRegex from "../utils/validator";
import { dbActions } from "../utils/crud";
import AppContext from "../utils/appcontext";

function Login() {
  const [email, checkEmail, validEmail] = useValidateRegex(
    null,
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );
  const [password, checkPassword, validPassword] = useValidateRegex(
    null,
    /.{6,}/
  );
  const [submitLoading, setSubmitLoading] = useState(false);
  const appData = useContext(AppContext);

  const submitForm = async (e) => {
    setSubmitLoading(true);
    e.preventDefault();
    dbActions.signIn(email, password).catch((err) => {
      console.log(err.message);
      setSubmitLoading(false);
    });
    appData.newUser.set(false);
  };
  return (
    <section className="pageFrame">
      <div className="authCard">
        <form
          className="option1"
          spellCheck={false}
          style={{ borderColor: "#21e386" }}
          autoComplete="on"
        >
          <h1 className="formHeading" style={{ color: "#21e386" }}>
            Login
          </h1>
          <div className="inputFrame">
            <label htmlFor="signupEmail">Email</label>
            <input
              type="email"
              id="signupEmail"
              onInput={(e) => checkEmail(e.target.value)}
            />
            <span
              className="correctSyntax"
              style={{ height: !validEmail ? (email ? 15 : 0) : 0 }}
            >
              Invalid email address
            </span>
          </div>
          <div className="inputFrame">
            <label htmlFor="signupPWd">Password</label>
            <input
              type="password"
              id="signupPwd"
              onChange={(e) => checkPassword(e.target.value)}
            />
          </div>
          <button
            disabled={!validEmail || !validPassword}
            style={{ backgroundColor: "#21e386" }}
            className="submitForm"
            onClick={(e) => submitForm(e)}
          >
            <span>
              {!submitLoading ? "Log In" : <BiLoaderAlt color="white" />}
            </span>
          </button>
        </form>
        <div className="altAuth">
          <span>Don't yet have an account?</span>
          <Link
            to="/signup"
            className="optionLink"
            style={{ color: "#21e386" }}
          >
            Signup
          </Link>
        </div>
        <button
          onClick={() =>
            dbActions.signIn("lekanalowooja@yahoo.com", "Developer@2022")
          }
        >
          Dummy Login
        </button>
      </div>
    </section>
  );
}

export default Login;
