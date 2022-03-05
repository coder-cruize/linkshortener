import { useContext, useLayoutEffect, useState } from "react";
import AppContext from "../utils/appcontext";
import { RiErrorWarningFill } from "react-icons/ri";
import "./css/contenthandler.css";

export default function ErrorHandler({ children }) {
  const appData = useContext(AppContext)
  if (appData.data !== false) return <>{children}</>;
  return (
    <div className="pageErrorFrame">
      <div className="pageError">
        <span className="pageErrorIcon">
          <RiErrorWarningFill size={100} color="#6b21e3" />
        </span>
        <h2 className="pageErrorHeading">Well, this is embarassing...</h2>
        <span className="pageErrorText">
          An unexpected problem seems to have occurred.
          <br />
          Try the steps below and if error persists feel free to reach out to
          us.
        </span>
        <li className="pageErrorList">Reload the page</li>
        <li className="pageErrorList">Try again in 10 - 30 minutes</li>
        <div className="pageErrorFooter">
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    </div>
  );
}
export function SkeletonLoader({ children, style }) {
  const [loading, setLoading] = useState(true);
  const appData = useContext(AppContext);
  useLayoutEffect(() => {
    if (appData.data === null) setLoading(true);
    else setLoading(false);
  }, [appData.data]);
  if (loading)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          animation: "skeleton-loading 1s linear infinite alternate",
          ...style,
        }}
      ></div>
    );
  return children || null;
}
