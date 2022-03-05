import { useContext, useLayoutEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import html2canvas from "html2canvas";
import QrCode from "../components/qr";
import AppContext from "../utils/appcontext";
import { IoIosArrowBack } from 'react-icons/io'
import './css/linksdata.css'

export default function LinksData() {
  const [loading, setLoading] = useState(true);
  const appData = useContext(AppContext);
  const { linkId } = useParams()
  useLayoutEffect(() => {
    setLoading(appData.data == null);
  }, [appData.data]);
  function Download() {
    html2canvas(document.querySelector("#react-qrcode-logo")).then((canvas) => {
      const link = document.createElement("a");
      link.download = "react-qrcode-logo.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  function SkeletonLoader({ children, style }) {
    if (loading)
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            animation: "skeleton-loading 1s linear infinite alternate",
            ...style,
          }}
        ></div>
      );
    if (children) return children;
    else return "";
  }
  return appData.data !== false ? (
    <>
    <section className="linksDataContent">
      <h1 className="linksHeading">
        <Link to='/admin/links'><IoIosArrowBack size={30} color='rgb(116, 116, 116)' /></Link>
        <SkeletonLoader style={{width: 100, height: 30, borderRadius: 5}}>/{linkId}</SkeletonLoader>
      </h1>
    </section>



      <QrCode data={appData.data.links[linkId].fullLink} />
      <button onClick={Download}>Download</button>
    </>
  ) : (
    <>
      <span>'Error'</span>
    </>
  );
}
