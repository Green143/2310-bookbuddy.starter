import { useState, useEffect } from 'react'
import axios from 'axios'
import bookLogo from './assets/books.png'
import {Routes, Route, Link} from 'react-router-dom'
import Navigations from "./components/Navigations"
import Books from "./components/Books"
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'
import SuccessRegi from './components/SuccessRegi'
import Homepage from './components/Homepage'
import SingleBooks from "./components/SingleBooks"
import SearchBar from "./components/SearchBar"

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({})
  const [books, setBooks] = useState([])

 useEffect (() => {
  const fetchBooks = async() => {
    const {data} = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
    console.log(data)
    setBooks(data.books)
    
  }
  fetchBooks()
 }, [])

  useEffect(() => {
    const attemptLogin = async() => {
      const loggedInToken = window.localStorage.getItem('token')
      

      if(loggedInToken){
        const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedInToken}`
          }
        })

        setUser(response.data)
      }else{
        
        throw 'no token'
      }

    }
    
    attemptLogin()
  },[token])

 
  return (
    <>
    <h1><img id='logo-image' src={bookLogo}/><Link to='/'>Library App</Link></h1>
    <Navigations user={user}/>
    <h4> Search: </h4>
    <SearchBar/>
    
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/successReg' element={<SuccessRegi />}/>
      <Route path='/books/:id' element={<SingleBooks books={books}/>}/>
      <Route path='/books' element={<Books books={books}/>}/>
      <Route path='/login' element={<Login setUser={setUser} setToken={setToken}/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/account' element={<Account user={user} setUser={setUser} setToken={setToken}/>}/>
    </Routes>

      
    </>
  )
}

export default App
