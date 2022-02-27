import { useState } from "react";
import { useBetween } from "use-between";
import './css/modal.css'

function useModalState() {
    const [modal, displayModal] = useState(null);
    const setModal = (children) => {
        console.log(children)
        displayModal(
            <div onClick={() => displayModal(null)} className='appModal'>
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
