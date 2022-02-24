import { useState } from 'react';
import { Link } from 'react-router-dom'
import './css/auth.css'

function Login(props){
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [validEmail, setValidEmail] = useState(false)
  const [emailSyntax, showEmailSyntax] = useState(false)

  const checkEmail = (email) => {
    setEmail(email)
    if(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      setValidEmail(true)
      showEmailSyntax(false)
    }
    else{
      setValidEmail(false)
      showEmailSyntax(true)
    }
  }
  return(
    <section className="pageFrame">
      <div className="authCard">
        <form className='option1' spellCheck={false} style={{borderColor: '#21e386'}}>
          <h1 className="formHeading" style={{color: '#21e386'}}>Login</h1>
          <div className="inputFrame">
            <label htmlFor="signupEmail">Email</label>
            <input type="email" id="signupEmail" onChange={(e) => checkEmail(e.target.value)}/>
            <span className='correctSyntax' style={{height: emailSyntax ? 15 : 0}}>Invalid email address</span>
          </div>
          <div className="inputFrame">
            <label htmlFor="signupPWd">Password</label>
            <input type="password" id="signupPwd" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          // Todo: add loader inside button onclick cuz of slow internet connections
          <button disabled={!validEmail} style={{backgroundColor: '#21e386'}} className='submitForm' onClick={(e) => {e.preventDefault();props.main(email, password)}}>Login</button>
        </form>
        <div className="altAuth">
          <span>Don't yet have an account?</span>
          <Link to='/signup' className='optionLink' style={{color: '#21e386'}}>Signup</Link>
        </div>
        <button onClick={() => props.main('lekanalowooja@yahoo.com', 'Developer@2022')}>Dummy Login</button>
      </div>
    </section>
	)
}

export default Login