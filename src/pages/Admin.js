import { lazy, useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Signout from "../components/signout";
import AppContext from "../utils/appcontext";
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiHome6Fill } from "react-icons/ri";
import logo from "../images/logo.svg";
const OnBoard = lazy(() => import("../components/onboard"));

export default function Admin() {
  const [showModal, setShowModal] = useState(false)
  const appData = useContext(AppContext);

  return (
    <div className="bodyContainer">
      {showModal && <Signout unsubscribe={() => setShowModal(false)}/>}
      {appData.newUser.val && <OnBoard />}
      <section className="sideNav">
        <div className="topItems">
          <img className="logo" src={logo} alt="" />
          <nav className="navLinks">
            <NavLink
              to="/admin/home"
              className={({ isActive }) =>
                isActive ? "navLinkActive" : "navLinkInActive"
              }
            >
              <RiHome6Fill size={25} />
            </NavLink>
            <NavLink
              to="/admin/links"
              className={({ isActive }) =>
                isActive ? "navLinkActive" : "navLinkInActive"
              }
            >
              <RiHome6Fill size={25} />
            </NavLink>
            <NavLink
              to="/admin/test"
              className={({ isActive }) =>
                isActive ? "navLinkActive" : "navLinkInActive"
              }
            >
              <RiHome6Fill size={25} />
            </NavLink>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                isActive ? "navLinkActive" : "navLinkInActive"
              }
            >
              <RiHome6Fill size={25} />
            </NavLink>
          </nav>
        </div>
        <div className="bottomItems">
          <NavLink to="/admin/settings" className="user">
            {!appData.user.photoURL ? (
              <FaUserCircle size={40} color="#9498a1" />
            ) : (
              <img src={appData.user.photoURL} alt={appData.user.displayName} />
            )}
          </NavLink>
          <button className="logout" onClick={() => setShowModal(true)}>
            <MdLogout size={20} color="red" />
          </button>
        </div>
      </section>
      <section className="content">
        <Outlet />
      </section>
    </div>
  );
}
