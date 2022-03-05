import "./css/loader.css";

export default function Loader({ suspended=false }) {
  return (
    <div className={suspended ? "suspendedLoaderFrame" : "loaderFrame"}>
      <span className="loader"></span>
    </div>
  );
}
