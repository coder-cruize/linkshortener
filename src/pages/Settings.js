// import { useContext, useRef, useState } from "react";
// import { storage } from "../firebaseClient";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { updateProfile } from "firebase/auth";
// import toast from "react-hot-toast";
// import Crop from "../components/crop";
// import AppContext from "../utils/appcontext";
// import './css/settings.css'

// export default function Settings() {
//   const [fullImg, setFullImg] = useState(null);
//   const [cropImg, setCropImg] = useState(null);
//   const inputRef = useRef(null);
//   const appData = useContext(AppContext);
//   //* Update profile
//   function setProfile(canvas, crop, displayName = appData.user?.displayName) {
//     const profileRef = ref(
//       storage,
//       "users/" + appData.user.uid + "/profile.jpg"
//     );
//     const handleUpload = (file) => {
//       fetch(file)
//         .then((res) => res.blob())
//         .then((blob) => {
//           uploadBytes(profileRef, blob).then(() => {
//             (async () => {
//               try {
//                 let profileURL = await getDownloadURL(profileRef);
//                 await updateProfile(appData.user, {
//                   photoURL: profileURL,
//                   displayName: displayName,
//                 });
//                 toast.success("Updated Profile Photo");
//                 appData.reload();
//               } catch (error) {
//                 toast.error(error.message);
//               }
//             })();
//           });
//         })
//         .catch((error) => {
//           toast.error(
//             `An error occured while uploading profile. Try Again Later`
//           );
//         });
//     };
//     if (!crop || !canvas) return;
//     canvas.toBlob(
//       (blob) => {
//         handleUpload(window.URL.createObjectURL(blob));
//       },
//       "image/png",
//       1
//     );
//   }
//   return (
//     <>
//       <h1>HI, {appData.user.displayName || "User"}</h1>
//       <div
//         style={{
//           width: "100px",
//           minHeight: "60px",
//           backgroundColor: "grey",
//           borderRadius: "10px",
//         }}
//       >
//         <input
//           ref={inputRef}
//           type="file"
//           onChange={(e) => setFullImg(e.target.files[0])}
//         />
//         {!fullImg ? "" : <Crop img={fullImg} userCrop={setCropImg} />}
//         <button
//           type="button"
//           disabled={!cropImg?.crop.width || !cropImg?.crop.height}
//           onClick={() => setProfile(cropImg?.canvas, cropImg?.crop)}
//         >
//           Update
//         </button>
//         {/* //todo when updating profile show a loader and prevent user from clicking again*/}
//         <button
//           onClick={() => {
//             setFullImg(null);
//             inputRef.current.value = null;
//           }}
//         >
//           clear
//         </button>
//       </div>
//     </>
//   );
// }

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ErrorHandler, { SkeletonLoader } from "../components/contenthandler";
import AppContext from "../utils/appcontext";
import "./css/settings.css";
import UpdatePhoto from "../components/updatephoto";

export default function Links() {
  const [showModal, setShowModal] = useState(true);
  const appData = useContext(AppContext);
  return (
    <ErrorHandler>
      {showModal && <UpdatePhoto unsubscribe={() => setShowModal(false)} />}
      <section className="settingsContent">
        <h1 className="settingsHeading">Settings</h1>
        <div className="settingsTabsContent">
          <div className="settingsTab">
            <div className="settingsTabHeading">
              <h2 className="settingsTabHeadingText">Personal Info</h2>
              <span className="settingsTabHeadingInfo">Update your details here</span>
              <hr className="settingsTabHeadingLine" />
            </div>
            <div className="settingsTabContent">
              <label className="settingsTabContentInput">
                Name
                <input type="text" defaultValue={"Lekan"}/>
              </label>
            </div>
          </div>
        </div>
        <div className="testxx"></div>
      </section>
    </ErrorHandler>
  );
}
