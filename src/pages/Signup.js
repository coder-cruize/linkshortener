import { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { BsGoogle } from 'react-icons/bs'
import './css/auth.css'
import toast from 'react-hot-toast';

function SignUp(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const validator = useRef()
  const [invalidEmail, setInvalidEmail] = useState(true)
  const [invalidPassword, setInvalidPassword] = useState(true)
  const [invalidName, setInvalidName] = useState(true)
  const [nameSyntax, showNameSyntax] = useState(false)
  const [emailSyntax, showEmailSyntax] = useState(false)
  const [pwdSyntax, showPwdSyntax] = useState(false)
  
  const checkName = (name) => {
    setName(name)
    function setValidation(isValid){
      showNameSyntax(!isValid)
      setInvalidName(!isValid)
    }
    if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(name)) setValidation(false)
    else if(name == '') setValidation(false)
    else if(name.length < 3) setValidation(false)
    else if(name.includes(' ')) setValidation(false)
    else setValidation(true)
  }
  const checkEmail = (email) => {
    setEmail(email)
    if(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      setInvalidEmail(false)
      showEmailSyntax(false)
    }
    else{
      setInvalidEmail(true)
      showEmailSyntax(true)
    }
  }
  const checkPassword = (pwd) => {
    setPassword(pwd)
    let strength = 0
    if (pwd.match(/[a-z]+/)) strength += 1
    if (pwd.match(/[A-Z]+/)) strength += 1
    if (pwd.match(/[0-9]+/)) strength += 1
    if (pwd.match(/[$@#&!]+/)) strength += 1
    function  setValidation(width, color, isValid) {
      validator.current.style.width = width;
      validator.current.style.backgroundColor = color
      setInvalidPassword(!isValid)
      showPwdSyntax(!isValid)
    }
    if(strength == 0) setValidation('0%', '', false)
    else if(pwd.match(/^.{6,}$/)){
      if(strength <= 2) setValidation('20%', 'red', false)
      if(strength == 3) setValidation('50%', 'orange', true)
      if(strength == 4) setValidation('100%', 'rgb(2, 189, 2)', true)
    }
    else setValidation('20%', 'red', false)
  }
  return(
    <section className="pageFrame">
      <div className="authCard">
        <form className='option1' spellCheck={false} style={{borderColor: '#6b21e3'}}>
          <h1 className="formHeading" style={{color: '#6b21e3'}}>Signup</h1>
          <div className="inputFrame">
            <label htmlFor="signupName">Nickname</label>
            <input type="text" id="signupName" onKeyUp={(e) => checkName(e.target.value)}/>
            <span className='correctSyntax' style={{height: nameSyntax ? 15 : 0}}>At least 3 characters and not include special characters or white space</span>
          </div>
          <div className="inputFrame">
            <label htmlFor="signupEmail">Email</label>
            <input type="email" id="signupEmail" onChange={(e) => checkEmail(e.target.value)}/>
            <span className='correctSyntax' style={{height: emailSyntax ? 15 : 0}}>Invalid email address</span>
          </div>
          <div className="inputFrame">
            <label htmlFor="signupPWd">Password</label>
            <input type="password" id="signupPwd" onChange={(e) => checkPassword(e.target.value)}/>
            <span className='correctSyntax' style={{height: pwdSyntax ? 30 : 0}}>At least 6 characters, 1 capital and small letter, 1 special character and <br /> 1 number</span>
          </div>
          <div className="pwdValidator">
            <span ref={validator} className="valid1" style={{backgroundColor: 'red'}}></span>
          </div>
          <button className='submitForm' disabled={invalidName || invalidEmail || invalidPassword} style={{backgroundColor: '#6b21e3'}} onClick={(e) => {e.preventDefault();props.main(name, email, password)}}>Signup</button>
        </form>
        <div className="altAuth">
          <span>Already have an account?</span>
          <Link to='/' className='optionLink' style={{color: '#6b21e3'}}>Log In</Link>
        </div>
        redirect from here to a page to put name and profile <br />
        remove name from this form and move it here ^^^
        <button className="googleAuth">
          <BsGoogle size={20} style={{marginRight: '10px'}}/>
          <span>Sign up with Google</span>
        </button>
      </div>
    </section>
	)
}

export default SignUp