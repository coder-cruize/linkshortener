import { auth, rtdb } from '../firebaseClient';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { set, update, get, ref, increment, onValue } from 'firebase/database';

const setData = (path, data) => new Promise((resolve, reject) => {
  set(ref(rtdb, path), data)
  .then(() => {
    resolve()
  })
  .catch(() => {
    reject()
  })
})
const updateData = (path, data) => new Promise((resolve, reject) => {
  update(ref(rtdb, path), data)
  .then(() => {
    resolve()
  })
  .catch(() => {
    reject()
  })
})
const getData = (path) => new Promise((resolve, reject) => {
  get(ref(rtdb, path))
  .then((snapshot) => {resolve(snapshot)})
  .catch((err) => {reject(new Error(err.message))})
})
const randomId = () => {
  function generate(){
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let length = 6
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result
  }
  async function isUsed(id){
    let data = await getData(`links/${id}`)
    return(data.exists())
  }
  let code = generate()
  if(isUsed(code) === true) randomId();
  else return code
}
export const dbActions = {
  signUp: (email, password) => new Promise((resolve, reject) => {
    try {
      createUserWithEmailAndPassword(auth, email.trim(), password);
      resolve()
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') reject('An account already exists with this Email')
    }
  }),
  signIn: (email, password) => new Promise((resolve, reject) => {
    try {
      signInWithEmailAndPassword(auth, email.trim(), password)
      resolve()
    } catch (error) {
      if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') reject('Incorrect Email or Password')
      if(error.code === 'auth/too-many-requests') reject('This account has been temporarily disabled. Try again later')
    }
  }),
  signOut: () => new Promise((resolve, reject) => {
    try {
      signOut(auth);
      resolve()
    } catch(err) {
      reject("Error logging out");
    }
  }),
  addLink: (uid, name, url) => new Promise((resolve, reject) => {
    try{
      let id = randomId()
      let userdata = {
        [id]: true
      }
      let linkdata = {
        auth: {
          name: name,
          fullLink : url,
          live: true
        },
        noauth: { 
          clicks: 0,
        }
      }
      try {
        updateData(`users/${uid}`, userdata).then(() => {
          updateData(`links/${id}`, linkdata).then(() => {
            resolve()
          })
        })
      } catch (error) {
        reject(error.message)
      }
    }
    catch{
      reject('Could not assign id')
    }
  }),
  getLink: async (Id) => new Promise((resolve, reject) => {
    getData(`links/${Id}/auth/`)
    .then((data) => {
      if(data.exists() && data.val().live){
        setData(`links/${Id}/noauth/clicks`, increment(1))
        .then(() => {
          resolve(data.val().fullLink)
        })
      }
      else reject()
    })
    .catch((error) => {
      reject(error.message)
    })
  }),
  deleteLink: (uid, Id) => new Promise((resolve, reject) => {
    try {
      setData(`links/${Id}`, null).then(() => {
        setData(`users/${uid}/${Id}`, null).then(() => {
          resolve()
        })
      })
    } catch (error) {
      reject(error.message)
    }
  }),
  getAppData: (uid) => new Promise((resolve, reject) => {
    let dataBoilerPlate = {
      linkNum: 0,
      clickNum: 0,
      links: {}
    }
    getData(`users/${uid}`)
    .then((userLinks) => {
      if(userLinks.val() === null){
        resolve(dataBoilerPlate)
        return
      }
      Promise.all(Object.keys(userLinks.val()).map(async (link) => {
        let data = await getData(`links/${link}`)
        return { [link]: {...(data.val().auth), ...(data.val().noauth)}}
      }))
      .then((data) => {
        dataBoilerPlate.linkNum = data.length
        data.forEach((link) => {
          dataBoilerPlate.clickNum += Object.values(link)[0].clicks
          dataBoilerPlate.links = { ...dataBoilerPlate.links, ...link }
        })
        resolve(dataBoilerPlate)
      })
    })
  })
}