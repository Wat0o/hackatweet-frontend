import styles from '../styles/Login.module.css';
import {Modal, Button} from 'antd'
import {useState} from 'react' 
import {useDispatch} from 'react-redux'
import { login } from '../reducers/user'
 

function Login() {

  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstnameUp, setFirstnameUp] = useState('')
  const [usernameUp, setUsernameUp] = useState('')
  const [passwordUp, setPasswordUp] = useState('')

  const handleSubmit = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: usernameUp, password: passwordUp, firstname: firstnameUp }),
    })
      .then(response => response.json())
      .then(data => {
        dispatch(login({ username: usernameUp, firstname:firstnameUp,  token: data.token }))
      })
  }

  return (
    <div className={styles.container}>
      <img src='loginPage.jpg' alt="login page" />
      <div className={styles.btnContainer}>
        <img src='logo.webp' alt="logo" />
        <h2>See what's happening</h2>
        <span>Join Hackatweet today.</span>
        <Button type='primary' onClick={()=>setIsModalOpen(true)} >Sign up</Button>
        <Modal title="Basic Modal" open={isModalOpen} footer={[
          <Button key="back" onClick={handleSubmit}>
            Sign up
          </Button>
        ]}>
        <input onChange={e=>setFirstnameUp(e.target.value)} value={firstnameUp} placeholder='Firstname'/>
        <input onChange={e=>setUsernameUp(e.target.value)} value={usernameUp} placeholder='Username'/>
        <input onChange={e=>setPasswordUp(e.target.value)} value={passwordUp} placeholder='Password'/>
      </Modal>
        <span>Already have an account?</span>
        <Button>Sign in</Button>
      </div>
    </div>
  );
}

export default Login;