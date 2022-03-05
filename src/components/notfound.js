import { useNavigate } from 'react-router-dom';
import logo from "../images/logo.svg";
import './css/notfound.css'

export default function NotFound({ loc }) {
    const navigate = useNavigate();
    let classname;
    if(loc === 'root' || loc === 'link') classname = "rootNotFound";
    if(loc === 'admin') classname = "adminNotFound";
    function Destination(e){
      e.preventDefault();
      if(loc === 'root' || loc === 'admin') navigate(-1);
      if(loc === 'link') navigate("/admin/home");
    }
    return (
      <section className={classname}>
        <div className="heroCard">
          <img className="heroCardLogo" src={logo} alt=""/>
          <div className="heroCardText">
            {loc === 'link' ? "The page you're looking for doesn't exist." : "Oops! This page doesn't exist"}
          </div>
          <a className="heroCardLink" href="/" onClick={(e) => Destination(e)}>
            {loc === 'link' ? "Want it? Get it now" : "Go back"}
          </a>
        </div>
      </section>
    );
  }