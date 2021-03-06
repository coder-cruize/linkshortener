import { useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ErrorHandler, { SkeletonLoader } from "../components/contenthandler";
import AppContext from "../utils/appcontext";
import { MdContentPaste } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { BiLink } from "react-icons/bi";
import { HiOutlineCursorClick } from "react-icons/hi";
import folder from "../images/folder.png";
import "./css/home.css";

export default function Home() {
  const appData = useContext(AppContext);
  function ShortLinkItem({ url, name, linkId }) {
    const copy = () => {
      navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard");
    };
    return (
      <>
        <div className="shortLink">
          <div className="shortLinkLeft">
            <div className="shortLinkTitle">
              <span className="shortLinkTitleMain">{name}</span>
              <span className="shortLinkTitleSub">{url}</span>
            </div>
            <button className="shortLinkButton" onClick={copy}>
              <span className="text">Copy</span>
              <MdContentPaste
                size={20}
                color="rgb(94, 94, 94)"
                style={{ transition: "0.3s" }}
              />
            </button>
          </div>
          <Link to={`/admin/links/${linkId}`} className="shortLinkButton">
            <FiEdit3
              size={20}
              color="rgb(94, 94, 94)"
              style={{ transition: "0.3s" }}
            />
            <span className="text">Edit</span>
          </Link>
        </div>
      </>
    );
  }
  return (
    <ErrorHandler>
      <section className="homeContent">
        <h1 className="homeHeading">Home</h1>
        <section className="homeContentFrame">
          <div className="homeContentLeft">
            <section className="overview">
              <h1 className="overviewHeading">Dashboard</h1>
              <div className="overviewContent">
                <div className="overviewItem">
                  <SkeletonLoader>
                    <div className="overviewItemIconFrame">
                      <span
                        className="overviewItemIcon"
                        style={{ backgroundColor: "rgba(0, 0, 255, 0.2)" }}
                      >
                        <BiLink size={25} color="#1c06da" />
                      </span>
                    </div>
                    <div className="overviewItemData">
                      <span className="overviewItemDataValue">
                        {appData.data?.linkNum}
                      </span>
                      <span className="overviewItemDataTitle">Links</span>
                    </div>
                  </SkeletonLoader>
                </div>
                <div className="overviewItem">
                  <SkeletonLoader>
                    <div className="overviewItemIconFrame">
                      <span
                        className="overviewItemIcon"
                        style={{ backgroundColor: "rgba(165, 3, 197, 0.2)" }}
                      >
                        <HiOutlineCursorClick
                          size={25}
                          color="rgb(186, 0, 223)"
                        />
                      </span>
                    </div>
                    <div className="overviewItemData">
                      <span className="overviewItemDataValue">
                        {appData.data?.clickNum}
                      </span>
                      <span className="overviewItemDataTitle">Clicks</span>
                    </div>
                  </SkeletonLoader>
                </div>
                <div className="overviewItem">
                  <SkeletonLoader>
                    <div className="overviewItemIconFrame">
                      <span
                        className="overviewItemIcon"
                        style={{ backgroundColor: "rgba(0, 0, 255, 0.2)" }}
                      >
                        <BiLink size={25} color="#1c06da" />
                      </span>
                    </div>
                    <div className="overviewItemData">
                      <span className="overviewItemDataValue">123</span>
                      <span className="overviewItemDataTitle">Clicks</span>
                    </div>
                  </SkeletonLoader>
                </div>
                <div className="overviewItem">
                  <SkeletonLoader>
                    <div className="overviewItemIconFrame">
                      <span
                        className="overviewItemIcon"
                        style={{ backgroundColor: "rgba(0, 0, 255, 0.2)" }}
                      >
                        <BiLink size={25} color="#1c06da" />
                      </span>
                    </div>
                    <div className="overviewItemData">
                      <span className="overviewItemDataValue">123</span>
                      <span className="overviewItemDataTitle">Clicks</span>
                    </div>
                  </SkeletonLoader>
                  <SkeletonLoader></SkeletonLoader>
                </div>
              </div>
            </section>
            <section className="links">
              <h1 className="linksHeading">
                <span className="linksHeadingText">My links</span>
              </h1>
              <div className="linksContent">
                <SkeletonLoader
                  style={{
                    marginBottom: 15,
                    borderRadius: 15,
                    width: 740,
                    height: 70,
                  }}
                >
                  {appData.data ? (
                    Object.keys(appData.data.links).length > 0 ? (
                      Object.keys(appData.data.links).map((link) => {
                        return (
                          <ShortLinkItem
                            name={appData.data.links[link].name}
                            url={appData.data.links[link].fullLink}
                            linkId={link}
                            key={link}
                          />
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
          </div>
          <div className="homeContentRight">
            <section className="status">
              <h1 className="statusHeading">Status</h1>
              <div className="statusContent">
                <SkeletonLoader
                  style={{ height: 60, borderRadius: 20, marginBottom: 15 }}
                >
                  {appData.data ? (
                    Object.keys(appData.data.links).length > 0 ? (
                      Object.keys(appData.data.links).map((link) => {
                        return (
                          <div className="statusContentBlock" key={link}>
                            <span className="statusContentBlockText">
                              <span className="statusContentBlockTextName">
                                {appData.data.links[link].name}
                              </span>
                              <span className="statusContentBlockTextLink">
                                /{link}
                              </span>
                            </span>
                            <span className="statusContentBlockStatus">
                              <span
                                className="scbsDot"
                                style={{
                                  backgroundColor: appData.data.links[link].live
                                    ? "green"
                                    : "red",
                                }}
                              ></span>
                              <span
                                className="scbsText"
                                style={{
                                  color: appData.data.links[link].live
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {appData.data.links[link].live
                                  ? "Active"
                                  : "Inactive"}
                              </span>
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="empty">
                        Create some links to view their status
                      </div>
                    )
                  ) : null}
                </SkeletonLoader>
              </div>
            </section>
          </div>
        </section>
      </section>
    </ErrorHandler>
  );
}
