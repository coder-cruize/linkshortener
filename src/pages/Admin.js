import { Link, Outlet } from 'react-router-dom'
import logo from "../images/logo.svg";
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiHome6Fill } from "react-icons/ri";

export default function Admin(props) {
    return (
      <div className="bodyContainer">
        <section className="sideNav">
          <div className="topItems">
            <img className="logo" src={logo} alt="" />
            <nav className="navLinks">
              <Link to="/admin/home" className="navLink">
                <RiHome6Fill size={25} color="#6b21e3" />
              </Link>
              <Link to="/admin/links" className="navLink">
                X
              </Link>
              <Link to="/admin/test" className="navLink">
                X
              </Link>
              <Link to="/admin/settings" className="navLink">
                X
              </Link>
            </nav>
          </div>
          <div className="bottomItems">
            <Link to="/admin/settings" className="user">
              {!props.user.photoURL ? (
                <FaUserCircle size={40} color="#9498a1" />
              ) : (
                <img src={props.user.photoURL} alt={props.user.displayName} />
              )}
            </Link>
            <button className="logout" onClick={props.main}>
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