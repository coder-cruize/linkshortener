import { useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import html2canvas from "html2canvas";
import QrCode from "../components/qr";
import ErrorHandler, { SkeletonLoader } from "../components/contenthandler";
import AppContext from "../utils/appcontext";
import { dbActions } from '../utils/db'
import { IoIosArrowBack } from 'react-icons/io'
import './css/linksdata.css'
import toast from "react-hot-toast";

export default function LinksData() {
  const appData = useContext(AppContext);
  const { linkId } = useParams()
  const navigate = useNavigate()
  function Download() {
    html2canvas(document.querySelector("#react-qrcode-logo")).then((canvas) => {
      const link = document.createElement("a");
      link.download = "react-qrcode-logo.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  function deleteLink(){
    navigate('/admin/links');
		dbActions.deleteLink(appData.user.uid, linkId)
    toast.success('Link Deleted')
    appData.reload()
  }
  console.log(appData.data)
  return (
    <ErrorHandler>
    <section className="linksDataContent">
      <h1 className="linksHeading">
        <Link to='/admin/links'><IoIosArrowBack size={30} color='rgb(116, 116, 116)' /></Link>
        <SkeletonLoader style={{width: 100, height: 30, borderRadius: 5}}>/{linkId}</SkeletonLoader>
      </h1>
    </section>



      <QrCode data={appData.data.links[linkId].fullLink} />
      <button onClick={Download}>Download</button>
      <button onClick={deleteLink}>delete</button>
    </ErrorHandler>
  )
}
