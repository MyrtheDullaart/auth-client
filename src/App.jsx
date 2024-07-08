import { useState } from 'react';
import './App.css';

export default function App() {
  const [newUserData, setNewUserData] = useState({
    username: '',
    password: ''
  })

  const [userData, setUserData] = useState(null)
  
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

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}
