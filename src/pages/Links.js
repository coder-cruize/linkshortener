import { useLayoutEffect, useState } from 'react';
import QrCode from "../components/qr";
import html2canvas from "html2canvas";

export default function Links({ data }) {
  const [loading, setLoading] = useState(true)
  useLayoutEffect(() =>{
    console.log(data)
    setLoading(data == null)
  }, [data])
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
    return children
    // todo check fro when children is empty
  }
  return (
    data !== false ?
    <>
        <SkeletonLoader style={{ marginBottom: 15, borderRadius: 15, width: 740, height: 70}}>
            {
              data ?
              Object.keys(data.links).length > 0 ? 
                Object.keys(data.links).map(link => {
                  return <div> <button>{data.links[link].name}</button> <button>{data.links[link].fullLink}</button> <button>{link}</button></div>
                })
                : <span className="emptyText">You do not have any shortlinks</span>
              : null
            }
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


export function LinksData(){
    return('hello')
}
