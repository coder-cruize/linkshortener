import { useState, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useModal } from "./components/modal";
import Loader from "./components/loader";
import { Authentication, useData } from "./utils/authentication";
import AppContext from "./utils/appcontext";
import { MdOutlineErrorOutline, MdOutlineCheckCircle } from "react-icons/md";
import "./App.css";

const Admin = lazy(() => import("./pages/Admin"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));
const Settings = lazy(() => import("./pages/Settings"));
const ShortLink = lazy(() => import("./pages/Shortlink"));
const Test = lazy(() => import("./pages/Test"));
const Links = lazy(() => import("./pages/Links"));
const LinksData = lazy(() => import("./pages/LinksData"));
const NotFound = lazy(() => import("./components/notfound"));

export default function App() {
  const [isAuthenticated, Reload, user, appData, newUser] = useData();
  const { modal } = useModal()
  const [loader, setLoader] = useState(true);

  let location = useLocation();
  let appDataContext = {
    data: appData,
    reload: Reload,
    user: user,
    newUser: newUser,
  };
  //* if loader is true render loader after 1 second check if all resources are ready if ready render main app
  if (loader) {
    //* if path is shortlink show loader until full path is ready
    if (location.pathname.startsWith("/m/")) {
      setLoader(false);
    }
    //* if path is not shortlink check if user data is loaded
    else {
      setTimeout(() => {
        if (user !== null) setLoader(false);
      }, 1000);
    }
    return <Loader />;
  }
  return (
    // Todo: for each page add a component to render in case appData = false (error). check home.js for example
    // Todo: change the default loader for suspended components
    <>
      <AppContext.Provider value={appDataContext}>
        <Routes>
          <Route
            path="*"
            element={
              <Suspense fallback={<>Loading...</>}>
                <NotFound loc="root" />
              </Suspense>
            }
          />
          <Route
            path="/"
            If
            rel
            index
            element={
              <Authentication.NotRequired auth={isAuthenticated} path="/">
                <Login />
              </Authentication.NotRequired>
            }
            exact
          />
          <Route
            path="/signup"
            element={
              <Authentication.NotRequired auth={isAuthenticated} path="/signup">
                <SignUp />
              </Authentication.NotRequired>
            }
            exact
          />
          <Route
            path="/admin"
            element={
              <Authentication.Required auth={isAuthenticated}>
                <Admin />
              </Authentication.Required>
            }
            exact
          >
            <Route
              path="*"
              element={
                <Suspense fallback={<>Loading...</>}>
                  <NotFound loc="admin" />
                </Suspense>
              }
            />
            <Route
              path="home"
              element={
                <Suspense fallback={<>Loading...</>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="links"
              element={
                <Suspense fallback={<>Loading...</>}>
                  <Links />
                </Suspense>
              }
            />
            <Route
              path="links/:linkId"
              element={
                <Suspense fallback={<>Loading...</>}>
                  <LinksData />
                </Suspense>
              }
            />
            <Route
              path="test"
              element={
                <Suspense fallback={<>Loading...</>}>
                  <Test />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense fallback={<>Loading...</>}>
                  <Settings />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/m/:linkId"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ShortLink />
              </Suspense>
            }
          />
        </Routes>
      </AppContext.Provider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { 
            boxShadow: "none",
            fontFamily: 'montserrat',
            backgroundColor: 'rgb(250, 250, 250)'
          },
          error: {
            icon: <MdOutlineErrorOutline color="red" size={25}/>,
          },
          success: {
            icon: <MdOutlineCheckCircle color='green' size={25}/>,
          }
        }}
      />
      {modal}
    </>
  );
}
//todo make the user unable to set the app url as a link or else it can cause endless reloading
