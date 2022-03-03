import { useState } from "react";
import { useBetween } from "use-between";
import './css/modal.css'

function useModalState() {
    const [modal, displayModal] = useState(null);
    const setModal = (children, overide=false) => {
        if(children === null) {
            displayModal(null)
            return
        }
        const hideModal = () => {
            if(overide) return;
            else displayModal(null)
        }
        displayModal(
            <div onClick={() => hideModal()} className='appModal'>
                <div onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        )
    }
    return { modal, setModal };
}

export function useModal(){
    const { modal, setModal } = useBetween(useModalState);
    return { modal, setModal }
}
