import { useState, useLayoutEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../utils/appcontext";

export default function LinksData() {
  const [loading, setLoading] = useState(true);
  const appData = useContext(AppContext);
  useLayoutEffect(() => {
    setLoading(appData.data == null);
  }, [appData.data]);
  let { linkId } = useParams();
  return (
    <>
      {loading ? (
        "Loading..."
      ) : appData.data.links[linkId] !== undefined ? (
        <span>
          {linkId}:<br />
          fullLink: {appData.data.links[linkId].fullLink}
        </span>
      ) : (
        "error"
      )}
    </>
  );
}
