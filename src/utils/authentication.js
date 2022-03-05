import { Suspense, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ref, child, onValue } from "firebase/database";
import { auth, rtdb } from "../firebaseClient";
import toast from "react-hot-toast";
import Loader from "../components/loader";

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
        //* fetch app data
        (async () => {
          await onValue(
            child(ref(rtdb), `users/${currentUser.uid}`),
            (snapshot) => {
              try {
                let dataBoilerPlate = {
                  linkNum: 0,
                  clickNum: 0,
                  links: {},
                };
                if (snapshot.val()) {
                  let data = { ...snapshot.val() };
                  Object.keys(data).forEach(async (key) => {
                    await onValue(child(ref(rtdb), `links/${key}`), (value) => {
                      try {
                        data[key] = {
                          ...data[key],
                          clicks: value.val()?.clicks,
                        };
                        dataBoilerPlate.linkNum += 1;
                        dataBoilerPlate.clickNum += data[key].clicks;
                        dataBoilerPlate.links = { ...data };
                      } catch (error) {
                        toast.error(error.message);
                      }
                    });
                  });
                }
                setAppData(dataBoilerPlate);
              } catch (error) {
                console.log(error);
                setAppData(false);
              }
            }
          );
        })();
      }
      //* otherwise only permit entry to login, signup and shortlink
      else {
        if (isAuthenticated || isAuthenticated == null)
          setAuthentication(false);
        setAppData(null);
        setUser(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
