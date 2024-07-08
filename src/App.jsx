import { useState } from 'react';
import './App.css';

export default function App() {
  const [newUserData, setNewUserData] = useState({
    username: '',
    password: ''
  })

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  const [userData, setUserData] = useState(null)

  const [loginToken, setLoginToken] = useState(null)
  const [loginError, setLoginError] = useState(null)
  
  function handleSubmit(e) {
    e.preventDefault()

    async function addNewUser() {
      const options = {
        method: 'POST',
        body: JSON.stringify(newUserData),
        headers: {
          'Content-type': 'application/json',
        },
      }

      const response = await fetch('http://localhost:4000/register', options)
      const data = await response.json()

      setUserData(data.user)

      console.log(userData)
    }

    addNewUser()
    
    setNewUserData({
        username: '',
        password: ''
    })
  }
  
  function handleChange(e) {
    const {name, value} = e.target

    setNewUserData({
      ...newUserData,
      [name] : value
    })
  }

  function handleLoginChange(e) {
    const {name, value} = e.target

    setLoginData({
      ...loginData,
      [name] : value
    })
  }

  function handleLoginSubmit(e) {
    e.preventDefault()

    async function loginUser() {
      const options = {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
          'Content-type': 'application/json',
        },
      }

      const response = await fetch('http://localhost:4000/login', options)
      const data = await response.json()

      if(data.message) {
        setLoginError(data)
        setLoginToken(null)
      }

      if(data.token){
        setLoginToken(data)
        setLoginError(null)

        localStorage.setItem("jwt", data.token)
      }
    }

    loginUser()
    
    setLoginData({
        username: '',
        password: ''
    })
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>Register:</p>

        <label htmlFor="username">Username</label>
        <input type="text" name='username' required onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="text" name='password' required onChange={handleChange}/>

        <button>Submit</button>
      </form>
      <div className='user-data'>
        {userData && 
          <>
            <p>userName: {userData.username}</p>
            <p>Password hash: {userData.password}</p>
          </>
        }
      </div>

      <form onSubmit={handleLoginSubmit}>
        <p>Log in:</p>

        <label htmlFor="username">Username</label>
        <input type="text" name='username' required onChange={handleLoginChange} />

        <label htmlFor="password">Password</label>
        <input type="text" name='password' required onChange={handleLoginChange}/>

        <button>Submit</button>
      </form>

      <div className='login-data'>
        {loginToken && 
          <>
            <p>Token: {loginToken.token}</p>
          </>
        }

        {loginError && 
          <>
            <p>Error: {loginError.message}</p>
          </>
        }
      </div>
    </div>
  );
}
