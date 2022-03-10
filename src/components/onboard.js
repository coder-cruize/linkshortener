import { useContext, useEffect, useRef, useState, } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useModal } from "../components/modal";
import AppContext from "../utils/appcontext";
import useValidateRegex from '../utils/validator';
import { BiLoaderAlt } from "react-icons/bi";
import welcome from '../images/onboard_welcome.png'
import link from '../images/onboard_link.png'
import analytics from '../images/onboard_analytics.png'
import completed from '../images/onboard_completed.png'
import './css/onboard.css'
import { dbActions } from "../utils/db";

export default function OnBoard(){
    const [page, setPage] = useState(1)
    const [submitLoading, setSubmitLoading] = useState(false)
    const onboardRef = useRef(null)
    const { setModal } = useModal()
    const appData = useContext(AppContext)
    const [name, checkName, validName] = useValidateRegex('', /^[A-Za-z]{3,}$/)
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(() => {
        if(location.pathname !== '/admin/home') navigate('/admin/home');
        function CurrentPage(){
            const changePage = (val) => {
                onboardRef.current.style.opacity = 0
                setTimeout(() => {
                    setPage(page + val);
                    onboardRef.current.style.opacity = 1
                }, 200);
            }
            const completeOnboarding = () => {
                setSubmitLoading(true);
                dbActions.updateUser.name(appData.user, {displayName: (name.charAt(0).toUpperCase() + name.slice(1))})
                .then(() => {
                    setModal(null)
                    toast(`You're free to explore now, ${appData.user.displayName}. 😉`)
                    appData.newUser.set(false)
                })
                .catch(() => {
                    toast.error('An error occured while setting name. Try again');
                    submitLoading(false)
                })
            }
            switch(page) {
                default:
                    return(
                        <>
                            <div className="onboardImage">
                                <img src={welcome} alt="" />
                            </div>
                            <div className="onboardContent">
                                <h1 className="onboardContentHeader">Welcome</h1>
                                <h5 className="onboardContentText">Minly. Simple, Smart, and Precise.</h5>
                                <div className="onboardContentBtns" style={{justifyContent: 'center'}}>
                                    <button onClick={() => changePage(+1)}>Next</button>
                                </div>
                            </div>
                        </>
                    )
                case 2:
                    return(
                        <>
                            <div className="onboardImage">
                                <img src={link} alt="" />
                            </div>
                            <div className="onboardContent">
                                <h1 className="onboardContentHeader">Titles</h1>
                                <h5 className="onboardContentText">Your links are for you. Create targetted links with custom titles.</h5>
                                <div className="onboardContentBtns" style={{justifyContent: 'space-between'}}>
                                    <button onClick={() => changePage(-1)}>Previous</button>
                                    <button onClick={() => changePage(+1)}>Next</button>
                                </div>
                            </div>
                        </>
                    )
                case 3:
                    return(
                        <>
                            <div className="onboardImage">
                                <img src={analytics} alt="" />
                            </div>
                            <div className="onboardContent">
                                <h1 className="onboardContentHeader">Analytics</h1>
                                <h5 className="onboardContentText">Gain valuable insight of your links</h5>
                                <div className="onboardContentBtns" style={{justifyContent: 'space-between'}}>
                                    <button onClick={() => changePage(-1)}>Previous</button>
                                    <button onClick={() => changePage(+1)}>Next</button>
                                </div>
                            </div>
                        </>
                    )
                case 4:
                    return(
                        <>
                            <div className="onboardImage">
                                <img src={completed} alt="" />
                            </div>
                            <div className="onboardContent">
                                <h1 className="onboardContentHeader">That's All. 👍</h1>
                                <div className="onboardContentBtns" style={{justifyContent: 'space-between'}}>
                                    <button onClick={() => changePage(-1)}>Previous</button>
                                    <button onClick={() => changePage(+1)}>Next</button>
                                </div>
                            </div>
                        </>
                    )
                case 5:
                    return(
                        <>
                            <div className="onboardContent">
                                <h1 className="onboardContentHeader">Before you go</h1>
                                <h5 className="onboardContentText" style={{textAlign: 'left', paddingLeft: 0}}>what should we call you?</h5>
                                <input type="text" className="onboardContentInput" value={name} onChange={(e) => checkName(e.target.value)} autoFocus />
                                <h5 className="onboardContentText" style={{textAlign: 'left', paddingLeft: 0, paddingRight: 0}}>You can change this later. So just give us what you want to be called for now.</h5>
                                <div className="onboardContentBtns" style={{justifyContent: 'space-between'}}>
                                    <button onClick={() => changePage(-1)}>Previous</button>
                                    <button onClick={completeOnboarding} disabled={submitLoading || !validName}>{!submitLoading ? "Done" : <BiLoaderAlt color="white" size={20} />}</button>
                                </div>
                            </div>
                        </>
                    )       
    
            }
        }
        setModal(
            <div className="onboard">
                <div className="onboardContentFrame" ref={onboardRef}>
                    <CurrentPage />
                </div>
                <div className="onboardIndicatorFrame">
                    <div className="onboardIndicator">
                        <span className="onboardIndicatorItem" style={{backgroundColor: page === 1 ? '#6b21e3' : 'rgb(216, 216, 216)'}}></span>
                        <span className="onboardIndicatorItem" style={{backgroundColor: page === 2 ? '#6b21e3' : 'rgb(216, 216, 216)'}}></span>
                        <span className="onboardIndicatorItem" style={{backgroundColor: page === 3 ? '#6b21e3' : 'rgb(216, 216, 216)'}}></span>
                        <span className="onboardIndicatorItem" style={{backgroundColor: page === 4 ? '#6b21e3' : 'rgb(216, 216, 216)'}}></span>
                        <span className="onboardIndicatorItem" style={{backgroundColor: page === 5 ? '#6b21e3' : 'rgb(216, 216, 216)'}}></span>
                    </div>
                </div>
            </div>, true
        )
    }, [page, submitLoading, name])
    return null
}