import { useContext, useRef, useState } from "react";
import { storage } from "../firebaseClient";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import Crop from "../components/crop";
import toast from "react-hot-toast";
import AppContext from "../components/appcontext";

export default function Settings() {
  const [fullImg, setFullImg] = useState(null);
  const [cropImg, setCropImg] = useState(null);
  const inputRef = useRef(null);
  const appData = useContext(AppContext)
  //* Update profile
  function setProfile(canvas, crop, displayName = appData.user?.displayName) {
    const profileRef = ref(storage, "users/" + appData.user.uid + "/profile.jpg");
    const handleUpload = (file) => {
      fetch(file)
        .then((res) => res.blob())
        .then((blob) => {
          uploadBytes(profileRef, blob).then(() => {
            (async () => {
              try {
                let profileURL = await getDownloadURL(profileRef);
                await updateProfile(appData.user, {
                  photoURL: profileURL,
                  displayName: displayName,
                });
                toast("Updated Profile Photo");
                appData.reload();
              } catch (error) {
                toast(error.message);
              }
            })();
          });
        })
        .catch((error) => {
          toast.error(
            `An error occured while uploading profile. Try Again\n Error: ${error.message}`
          );
        });
    };
    if (!crop || !canvas) return;
    canvas.toBlob(
      (blob) => {
        handleUpload(window.URL.createObjectURL(blob));
      },
      "image/png",
      1
    );
  }
  return (
    <>
    <h1>HI, {appData.user.displayName || 'User'}</h1>
      <div
        className="popup"
        style={{
          width: "500px",
          minHeight: "300px",
          backgroundColor: "grey",
          borderRadius: "10px",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={(e) => setFullImg(e.target.files[0])}
        />
        {!fullImg ? "" : <Crop img={fullImg} userCrop={setCropImg} />}
        <button
          type="button"
          disabled={!cropImg?.crop.width || !cropImg?.crop.height}
          onClick={() => setProfile(cropImg?.canvas, cropImg?.crop)}
        >
          Update
        </button>
        {/* //todo when updating profile show a loader and prevent user from clicking again*/}
        <button
          onClick={() => {
            setFullImg(null);
            inputRef.current.value = null;
          }}
        >
          clear
        </button>
      </div>
    </>
  );
}
