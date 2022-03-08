import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Loader from "../components/loader";
import NotFound from "../components/notfound";
import { dbActions } from "../utils/db";

export default function ShortLink() {
  let { linkId } = useParams();
  const [url, setUrl] = useState(false);
  useEffect(() => {
    dbActions
      .getLink(linkId)
      .then((url) => {
        setUrl(url);
      })
      .catch(() => {
        setUrl(null);
      });
  }, []);

  return (
    <>
      {url !== false ? (
        url !== null ? (
          <HelmetProvider>
            <Helmet>
              <meta httpEquiv="refresh" content={"0; URL=" + url} />
            </Helmet>
          </HelmetProvider>
        ) : (
          <NotFound loc="link" />
        )
      ) : (
        <Loader />
      )}
    </>
  );
}
