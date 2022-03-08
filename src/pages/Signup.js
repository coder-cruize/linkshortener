/* eslint-disable no-useless-escape */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useValidateRegex, { useValidateListRegex } from "../utils/validator";
import { dbActions } from "../utils/db";
import AppContext from "../utils/appcontext";
import { BsGoogle } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";
import "./css/auth.css";

function SignUp() {
  const [email, checkEmail, validEmail] = useValidateRegex(
    null,
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );
  const [password, checkPassoword, passwordStrength] = useValidateListRegex(
    null,
    [
      /[a-z]+/,
      /[A-Z]+/,
      /[0-9]+/,
      /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/,
    ]
  );
  const [submitLoading, setSubmitLoading] = useState(false);
  const appData = useContext(AppContext);

  function submitForm(e) {
    setSubmitLoading(true);
    e.preventDefault();
    dbActions
      .signUp(email.trim(), password)
      .then(() => {
        appData.newUser.set(true);
      })
      .catch((err) => {
        toast.error(err.message);
        setSubmitLoading(false);
      });
  }

  return (
    <section className="pageFrame">
      <div className="authCard">
        <form
          className="option1"
          spellCheck={false}
          style={{ borderColor: "#6b21e3" }}
          autoComplete="off"
        >
          <h1 className="formHeading" style={{ color: "#6b21e3" }}>
            Signup
          </h1>
          <div className="inputFrame">
            <label htmlFor="signupEmail">Email</label>
            <input
              type="email"
              id="signupEmail"
              onChange={(e) => checkEmail(e.target.value)}
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
              onChange={(e) => checkPassoword(e.target.value)}
            />
            <span
              className="correctSyntax"
              style={{ height: passwordStrength < 3 ? (password ? 15 : 0) : 0 }}
            >
              At least 6 characters, 1 capital and small letter, 1 special
              character and <br /> 1 number
            </span>
          </div>
          <button
            className="submitForm"
            disabled={!validEmail || passwordStrength < 3}
            style={{ backgroundColor: "#6b21e3" }}
            onClick={(e) => submitForm(e)}
          >
            <span>
              {!submitLoading ? "Sign Up" : <BiLoaderAlt color="white" />}
            </span>
          </button>
        </form>
        <div className="altAuth">
          <span>Already have an account?</span>
          <Link to="/" className="optionLink" style={{ color: "#6b21e3" }}>
            Log In
          </Link>
        </div>
        <button className="googleAuth">
          <BsGoogle size={20} style={{ marginRight: "10px" }} />
          <span>Sign up with Google</span>
        </button>
      </div>
    </section>
  );
}

export default SignUp;
