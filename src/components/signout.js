import { useEffect } from "react";
import toast from "react-hot-toast";
import { useModal } from "../components/modal";
import { dbActions } from "../utils/crud";
import "./css/signout.css";

export default function Signout({ unsubscribe }) {
  const { setModal } = useModal();
  useEffect(() => {
    function signout() {
      dbActions
        .signOut()
        .then(() => {
          setModal(null);
          unsubscribe();
          toast("Hope we see you later.");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    function close() {
      setModal(null);
      unsubscribe();
    }
    setModal(
      <div className="signout">
        <h2 className="signoutText">Are you sure you want to signout?</h2>
        <div className="signoutBtns">
          <button className="signoutBtnsCancel" onClick={close}>
            Cancel
          </button>
          <button className="signoutBtnsSignout" onClick={signout}>
            Signout
          </button>
        </div>
      </div>,
      // todo use crud to signout
      false,
      unsubscribe
    );
  }, []);
  return null;
}
