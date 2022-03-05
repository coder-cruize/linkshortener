import { useEffect } from 'react'
import { useModal } from "../components/modal";

export default function Signout({ unsubscribe }){
  const { setModal } = useModal()
    useEffect(() => {
        setModal (
            <span style={{color: 'white', backgroundColor: 'black'}}>Are you sure youu wnat to sign out</span>
            // todo use crud to signout
        , false, unsubscribe)
    }, [])
    return null
}


