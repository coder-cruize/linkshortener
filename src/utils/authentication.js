import { Suspense, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseClient";
import Loader from "../components/loader";
import { dbActions } from "./db";

export const Authentication = {
  Required: ({ auth, children }) => {
    const location = useLocation();
    if (location.pathname.replaceAll("/", "").toLowerCase() === "admin")
      return <Navigate to="/admin/home" replace />;
    if (!auth) return <Navigate to="/" replace />;
    return <Suspense fallback={<Loader />}>{children}</Suspense>;
  },
  NotRequired: ({ auth, children }) => {
    const location = useLocation();
    if (auth)
      return <Navigate to="/admin/home" state={{ from: location }} replace />;
    return <Suspense fallback={<Loader suspended />}>{children}</Suspense>;
  },
};

export function useData() {
  const [isAuthenticated, setAuthentication] = useState(null);
  const [reload, setReload] = useState(null);
  const [user, setUser] = useState(null);
  const [appData, setAppData] = useState(null);
  const [isUserNew, setNewUser] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      //* if user object exist (user is logged in) allow user into admin
      if (currentUser) {
        if (!isAuthenticated) setAuthentication(true);
        if (reload !== null) currentUser.reload();
        setUser(currentUser);
        dbActions.getAppData(currentUser.uid)
        .then((data) => {
          setAppData(data)
        })
        .catch(() => {
          setAppData(false)
        })
      }
      //* otherwise only permit entry to login, signup and shortlink
      else {
        if (isAuthenticated || isAuthenticated == null)
          setAuthentication(false);
        setAppData(null);
        setUser(false);
      }
    });
  }, [reload, isUserNew]);
  const ReloadNow = () => {
    setReload(!reload);
  };
  const newUser = {
    val: isUserNew,
    set: (val) => setNewUser(val),
  };
  return [isAuthenticated, ReloadNow, user, appData, newUser];
}