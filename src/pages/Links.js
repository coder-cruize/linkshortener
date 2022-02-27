import { useContext, useLayoutEffect, useState } from 'react';
import QrCode from "../components/qr";
import html2canvas from "html2canvas";
import AppContext from '../components/appcontext';

export default function Links() {
  const [loading, setLoading] = useState(true)
  const appData = useContext(AppContext)
  useLayoutEffect(() =>{
    setLoading(appData.data == null)
  }, [appData.data])
  function Download() {
    html2canvas(document.querySelector("#react-qrcode-logo")).then((canvas) => {
      const link = document.createElement("a");
      link.download = "react-qrcode-logo.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  function SkeletonLoader({children, style}) {
    if(loading) return <div style={{width: '100%', height: '100%', animation: 'skeleton-loading 1s linear infinite alternate', ...style }}></div>
    if(children) return children
    else return ""
  }
  return (
    appData.data !== false ?
    <>
        <SkeletonLoader style={{ marginBottom: 15, borderRadius: 15, width: 740, height: 70}}>
            {
              appData.data ?
              Object.keys(appData.data.links).length > 0 ? 
                Object.keys(appData.data.links).map(link => {
                  return <div key={link}> <button>{appData.data.links[link].name}</button> <button>{appData.data.links[link].fullLink}</button> <button>{link}</button></div>
                })
                : <span className="emptyText">You do not have any shortlinks</span>
              : null
            }
        </SkeletonLoader>
        <SkeletonLoader>
          {null}
        </SkeletonLoader>
        <QrCode data="a" />
      <button onClick={Download}>Download</button>
    </> 
    :
    <>
      <span>'Error'</span>
    </>
  );
}