import { QRCode } from 'react-qrcode-logo';
import logo from '../images/qrlogo.svg'

export default function QrCode({ data }) {
  const defaultOptions = {
    ecLevel: 'M',
    eyeRadius: [
      [10, 10, 0, 10], // top/left eye
      [10, 10, 10, 0], // top/right eye
      [10, 0, 10, 10], // bottom/left
    ],
    enableCORS: false,
    size: 150,
    quietZone: 5,
    bgColor: "#FFFFFF",
    fgColor: "#6B21E3",
    logoImage: logo,
    logoWidth: 50,
    logoHeight: 50,
    logoOpacity: 1,
    qrStyle: "dots"
  }
  return <QRCode value={data} {...defaultOptions}/>
};
