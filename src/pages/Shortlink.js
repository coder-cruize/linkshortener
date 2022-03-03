import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { rtdb } from '../firebaseClient';
import { set, increment, get, child, ref } from 'firebase/database';
import { Helmet } from "react-helmet";
import Loader from '../components/loader';
import NotFound from '../components/notfound';

export default function ShortLink(){
    let { linkId } = useParams();
    const [url, setUrl] = useState(false)
    useEffect(() => {
      (async () => {
        await get(child(ref(rtdb), `links/${linkId}`))
        .then((snapshot) => {
          if(snapshot.exists()){
            if(snapshot.val().live){
              set(ref(rtdb, `links/${linkId}/clicks`),increment(1));
              setUrl(snapshot.val().fullLink)
            }
            else setUrl(null)
          }
          else setUrl(null)
        })
        .catch((error) => {
          console.log(error.message)
        })
      })()
    }, [])
    
    return (
      <>
        {
          url !== false ? (url !== null ? <Helmet><meta httpEquiv="refresh" content={"0; URL="+url} /></Helmet> : <NotFound loc="link"/>) : <Loader />
        }
      </>
    )
  }