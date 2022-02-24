import { useNavigate } from 'react-router-dom';
import logo from "../images/logo.svg";

export default function NotFound({ loc }) {
    const navigate = useNavigate();
    let classname;
    if(loc == 'root') classname = "rootNotFound";
    if(loc == 'admin') classname = "rootNotFound";
    if(loc == 'link') classname = "rootNotFound";
    function Destination(){
      if(loc == 'root') navigate(-1);
      if(loc == 'admin') navigate(-1);
      if(loc == 'link') navigate("/admin/home");
    }
    return (
      <section className={classname}>
        <div className="heroCard">
          <img className="heroCardLogo" src={logo} />
          <div className="heroCardText">
            {loc == 'link' ? "The page you're looking for doesn't exist." : "Oops! This page doesn't exist"}
          </div>
          <a className="heroCardLink" onClick={Destination}>
            {loc == 'link' ? "Want it? Get it now" : "Go back"}
          </a>
        </div>
      </section>
    );
  }