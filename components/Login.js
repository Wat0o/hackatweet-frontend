import styles from '../styles/Login.module.css';
import {Modal, Button} from 'antd'
import {useState} from 'react' 
import {useDispatch} from 'react-redux'
import { login } from '../reducers/user'
 

function Login() {

  const dispatch = useDispatch()

  const [signupOpen, setSignupOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const [firstnameUp, setFirstnameUp] = useState('')
  const [usernameUp, setUsernameUp] = useState('')
  const [passwordUp, setPasswordUp] = useState('')
  const [usernameIn, setUsernameIn] = useState('')
  const [passwordIn, setPasswordIn] = useState('')

  const handleSignup = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: usernameUp, password: passwordUp, firstname: firstnameUp }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        dispatch(login({ username: usernameUp, firstname:firstnameUp,  token: data.token }))
        setPasswordUp('');
        setUsernameUp('');
        setFirstnameUp('')
        setSignupOpen(false)
      })
  }

  const handleSignin = () => {
    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: usernameIn, password: passwordIn }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        dispatch(login({ username: usernameIn, firstname:data.firstname,  token: data.token }))
        setPasswordIn('');
        setUsernameIn('');
        setSigninOpen(false)
      })
  }

  const handleCancel = () => {
    setSignupOpen(false);
    setSigninOpen(false)
  };

  return (
    <div className={styles.container}>
      <img className={styles.background} src='background.png' alt="login page" />
      <div className={styles.btnContainer}>
        <img src='logo.png' alt="logo" className={styles.logo} />
        <h2>See what's happening</h2>
        <span>Join Hackatweet today.</span>
        <Button type='primary' className={styles.btn} onClick={() => setSignupOpen(true)} >Sign up</Button>
        <Modal className={styles.modal} open={signupOpen} onCancel={handleCancel} footer={[
          <Button key="back" onClick={handleSignup}>
            Sign up
          </Button>
        ]}>
          <div className={styles.modalContent}>
            <img src='logo.png' alt="logo" className={styles.logo} />
            <span>Create your Hacktweet account</span>
            <input onChange={e => setFirstnameUp(e.target.value)} value={firstnameUp} placeholder='Firstname' />
            <input onChange={e => setUsernameUp(e.target.value)} value={usernameUp} placeholder='Username' />
            <input onChange={e => setPasswordUp(e.target.value)} type="password" value={passwordUp} placeholder='Password' />
          </div>
        </Modal>
        <span>Already have an account?</span>
        <Button type='primary' onClick={() => setSigninOpen(true)} className={styles.btn}>Sign in</Button>
        <Modal className={styles.modal} open={signinOpen} onCancel={handleCancel} footer={[
          <Button key="back" onClick={handleSignin}>
            Sign in
          </Button>
        ]}>
          <div className={styles.modalContent}>
            <img src='logo.png' alt="logo" className={styles.logo} />
            <span>Connect to Hackatweet</span>
            <input onChange={e => setUsernameIn(e.target.value)} value={usernameIn} placeholder='Username' />
            <input onChange={e => setPasswordIn(e.target.value)} type="password" value={passwordIn} placeholder='Password' />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Login;