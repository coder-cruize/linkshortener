import { useEffect, useReducer, useState, useContext } from "react";
import { useModal } from "../components/modal";
import useValidateRegex from "../utils/validator";
import { BiLoaderAlt } from "react-icons/bi";
import "./css/createlink.css";
import { dbActions } from "../utils/db";
import AppContext from "../utils/appcontext";
import toast from "react-hot-toast";

export default function CreateLink({ unsubscribe }) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const { setModal } = useModal();
  const [name, setName] = useReducer(checkName, "");
  const [url, setUrl, validUrl] = useValidateRegex(
    "",
    /^(((ftp|http|https):\/\/))([A-Za-z]{2,})\.?([A-Za-z0-9]+[-]*){1,}(?<!-)\.([A-Za-z]{2,})(?:(?=\/|\?)(\/|\?).*|(?<=[A-za-z])$)/
  );
  const appData = useContext(AppContext);
  function checkName(name, inputValue) {
    return inputValue.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
  }
  useEffect(() => {
    function submit(e) {
      e.preventDefault();
      setSubmitLoading(true);
      dbActions
        .addLink(appData.user.uid, name, url)
        .then(() => {
          toast.success(`${name} added to links`);
          appData.reload()
        })
        .catch(() => {
          toast.error("An Error occured while creating link");
        });
      close();
    }
    function close(e = null) {
      if (e !== null) e.preventDefault();
      setSubmitLoading(false)
      setModal(null);
      unsubscribe();
    }
    setModal(
      <form className="createLink">
        <h2 className="createLinkTitle">Create Link</h2>
        <label className="createLinkInput">
          Name
          <input
            type="text"
            value={name}
            placeholder="eg. John Doe"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="createLinkInput">
          URL
          <input
            type="text"
            value={url}
            placeholder="eg. https://google.com"
            onChange={(e) => setUrl(e.target.value)}
          />
          <span>Note: URL should start with https://, http:// or ftp://</span>
        </label>
        <div className="createLinkBtns">
          <button
            className="createLinkBtnCancel"
            disabled={submitLoading}
            onClick={(e) => close(e)}
          >
            Cancel
          </button>
          <button
            className="createLinkBtnSave"
            disabled={
              submitLoading || !validUrl  || /^[\s]{1,}|^.{0,1}$/.test(name)
            }
            onClick={(e) => submit(e)}
          >
            {!submitLoading ? "Save" : <BiLoaderAlt color="white" size={20} />}
          </button>
        </div>
      </form>,
      false,
      unsubscribe
    );
  }, [name, url, submitLoading]);
  return null;
}

// todo when enter is clicked it keeps closing
// todo url does not accept 2character domain name