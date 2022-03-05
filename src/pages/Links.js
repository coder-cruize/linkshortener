import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import ErrorHandler, { SkeletonLoader } from "../components/contenthandler";
import CreateLink from "../components/createlink";
import AppContext from "../utils/appcontext";
import folder from "../images/folder.png";
import './css/links.css'

export default function Links() {
  const [showModal, setShowModal] = useState(false)
  const appData = useContext(AppContext);
  return (
    <ErrorHandler>
    {showModal && <CreateLink unsubscribe={() => setShowModal(false)}/>}
    <section className="linksContent">
      <h1 className="linksHeading">Links</h1>
      <button className="linksButton" onClick={() => setShowModal(true)}>Create New Link</button>
      <div className="linkItemContainer">
        <SkeletonLoader style={{width: '100%', height: 100, borderRadius: 10}}>
          {appData.data ? (
            Object.keys(appData.data.links).length > 0 ? (
              Object.keys(appData.data.links).map((link) => {
                return (
                  <Link to={`/admin/links/${link}`} className="linkItem" key={link}>
                    <span className="linkItemTitle">{appData.data.links[link].name}</span>
                    <span className="linkItemUrl">{appData.data.links[link].fullLink}</span>
                  </Link>
                );
              })
              ) : (
                <div className="empty">
                <span className="emptyImg">
                  <img src={folder} loading="lazy" alt="" />
                </span>
                <span className="emptyText">
                  You do not have any shortlinks
                </span>
              </div>
            )
          ) : null}
        </SkeletonLoader>
      </div>
    </section>
    </ErrorHandler>
  )
}
