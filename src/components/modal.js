import { useState } from "react";
import { useBetween } from "use-between";
import './css/modal.css'

function useModalState() {
    const [modal, displayModal] = useState(null);
    const setModal = (children, overide=false, onclose=null) => {
        if(children === null) {
            displayModal(null)
            return
        }
        const hideModal = () => {
            if(overide) return;
            else displayModal(null)
            if(onclose === null) return;
            onclose()
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
    const { modal, setModal, onClose } = useBetween(useModalState);
    return { modal, setModal, onClose }
}
