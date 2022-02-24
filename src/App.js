import { useEffect, useState, Suspense, lazy } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { auth, rtdb } from "./firebaseClient";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, child, onValue } from "firebase/database";
// Pages and Components
import "./App.css";
import Loader from "./components/loader";
const Admin = lazy(() => import("./pages/Admin"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));
const Settings = lazy(() => import("./pages/Settings"));
const ShortLink = lazy(() => import("./pages/Shortlink"));
const Test = lazy(() => import("./pages/Test"));
const Links = lazy(() => import("./pages/Links"));
const Modal = lazy(() => import("./components/modal"));
const NotFound = lazy(() => import("./components/notfound"));
// Libraries
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [isAuthenticated, setAuthentication] = useState(null);
  const [reload, setReload] = useState(null);
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const [appData, setAppData] = useState(null);
  const [modal, setModal] = useState(null)
  let location = useLocation();

  //* Check if user is logged in and change state to current value. oad changes fetch user data again
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      //* if user object exist (user is logged in) allow user into admin
      if (currentUser) {
        (isAuthenticated) ? null : setAuthentication(true); 
        if (reload !== null) currentUser.reload();
        setUser(currentUser);
        //* fetch app data
        (async () => {
          await onValue(child(ref(rtdb), `users/${currentUser.uid}`), (snapshot) => {
            try{
              let dataBoilerPlate = {
                linkNum: 0,
                clickNum: 0,
                links: {}
              }
              if(snapshot.val()){
                let data = {...snapshot.val()}
                Object.keys(data).forEach(async (key) => {
                  await onValue(child(ref(rtdb), `links/${key}`), (value => {
                    try{
                      data[key] = {
                        ...data[key],
                        clicks: value.val()?.clicks
                      }
                      dataBoilerPlate.linkNum += 1
                      dataBoilerPlate.clickNum += data[key].clicks
                      dataBoilerPlate.links = {...data}
                    }
                    catch(error){
                      toast.error(error.message)
                    }
                  }));
                });
              }
              setAppData(dataBoilerPlate);
            }
            catch(error){
              console.log(error);
              setAppData(false)
            }
          })
        })()
      }
      //* otherwise only permit entry to login, signup and shortlink
      else{
        if(isAuthenticated) setAuthentication(false)
        setAppData(null);
        setUser(false)
      }
    });
  }, [reload]);
  //* Any child element of this will make sure user is authenticated before entry
  const RequireAuth = ({ children }) => {
    if(isAuthenticated !== null){
      if (!isAuthenticated) return <Navigate to="/" state={{ from: location }} replace />;
      //* if path = admin go to admin/home
      let pathtest = "";
      for (let character of location.pathname)
      if (character !== "/") pathtest += character;
      if (pathtest.toLowerCase() == "admin")
        return <Navigate to="/admin/home" replace />;
      return children;
    }
    else setLoader(true)
  };
  //* Any child element of this will make sure user is not authenticated before entry
  const NoAuth = ({ children }) => {
    if (isAuthenticated)
      return <Navigate to="/admin/home" state={{ from: location }} replace />;
    return children;
  };
  //* All CRUD actions of Firebase
  const dbActions = {
    signUp: async (name, email, password) => {
      try {
        let userData = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userData.user, {displayName: name,})
        setAuthentication(true);
        toast("Welcome "+userData.user.displayName);
      } catch (error) {
        toast.error("MyError: " + error.message);
      }
    },
    signIn: async (email, password) => {
      try {
        let userData = await signInWithEmailAndPassword(auth, email, password);
        setAuthentication(true);
        toast("Welcome back "+userData.user.displayName);
      } catch (error) {
        toast.error("MyError: " + error.message);
      }
    },
    signOut: async () => {
      try {
        await signOut(auth);
        setAuthentication(false);
      } catch (error) {
        toast.error("Error logging out");
      }
    },
  };
  //* When called will reload user data
  const Reload = () => setReload(!reload);
  //* if loader is true render loader after 1 second check if all resources are ready if ready render main app
  if (loader) {
    //* if path is shortlink show loader until full path is ready
    if(location.pathname.startsWith('/m/')){
      setLoader(false)
    }
    //* if path is not shortlink check if user data is loaded
    else{
      setTimeout(() => {
        if(user !== null) setLoader(false);
      }, 1000);
    }
    return <Loader />;
  }
  return (
    // Todo: for each page add a component to render in case appData = false (error). check home.js for example
    // Todo: change the default loader for suspended components
    <>
      {
        modal ? <Modal close={() => {setModal(null)}}>{modal}</Modal> : null 
      }
      <Routes>
        <Route path="*" element={<Suspense fallback={<>Loading...</>}><NotFound loc="root" /></Suspense>} />
        <Route
          path="/"If rel
          index
          element={
            <Suspense fallback={<>Loading...</>}>
              <NoAuth path="/">
                <Login main={dbActions.signIn} />
              </NoAuth>
            </Suspense>
          }
          exact
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<>Loading...</>}>
              <NoAuth path="/signup">
                <SignUp main={dbActions.signUp} />
              </NoAuth>
            </Suspense>
          }
          exact
        />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Suspense fallback={<>Loading...</>}><Admin main={dbActions.signOut} user={user} /></Suspense>
            </RequireAuth>
          }
          exact
        >
          <Route path="*" element={<Suspense fallback={<>Loading...</>}><NotFound loc="admin" /></Suspense>} />
          <Route path="home" element={<Suspense fallback={<>Loading...</>}><Home data={appData} modal={setModal} /></Suspense>}/>
          <Route path="links" element={<Suspense fallback={<>Loading...</>}><Links data={appData} /></Suspense>} />
          {/* <Route path="links/:linkId" element={<LinksData />} /> */}
          <Route path="test" element={<Suspense fallback={<>Loading...</>}><Test /></Suspense>} />
          <Route
            path="settings"
            element={<Suspense fallback={<>Loading...</>}><Settings user={user} reload={Reload} /></Suspense>}
          />
        </Route>
        <Route path="/m/:linkId" element={<Suspense fallback={<>Loading...</>}><ShortLink /></Suspense>} />
      </Routes>
      <Toaster
      // Todo: change toast color to be visible at top level
        position='top-right'
        toastOptions={{
          style: {
            boxShadow: 'none'
          }
        }}
      />
    </>
  );
};
//todo make the user unable to set the app url as a link or else it can cause endless reloading