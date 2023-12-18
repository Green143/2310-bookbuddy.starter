import { useState, useEffect } from 'react'
import axios from 'axios'
import bookLogo from './assets/books.png'
import {Routes, Route, Link} from 'react-router-dom'
import Navigations from './components/Navigations'
import Books from './components/Books'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'
import SuccessRegi from './components/SuccessRegi'
import Homepage from './components/Homepage'
import SingleBooks from './components/SingleBooks'
import SearchBar from './components/SearchBar'
import AboutUs from './components/AboutUs'
import CheckedBook from './components/CheckedBook'
import './index.css'


function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({})
  const [books, setBooks] = useState([])

 useEffect (() => {
  const fetchBooks = async() => {
    const {data} = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
    //console.log(data)
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
    <h1><center><img src="https://media.tegna-media.com/assets/WATN/images/074fe32f-75f0-40a9-99db-d873898d49b8/074fe32f-75f0-40a9-99db-d873898d49b8_750x422.jpg" ></img>
    <br></br><Link to='/'>Read Me Library</Link></center></h1>
    <Navigations user={user}/>
    <h4> Search: </h4>
    
    <SearchBar books={books}/>
    <hr/>
    
    <Routes>
      <Route path='/' element={<Homepage user={user}/>}/>
      <Route path='/successRegi' element={<SuccessRegi />}/>
      <Route path='/books/:id' element={<SingleBooks books={books}/>}/>
      <Route path='/books' element={<Books books={books}/>}/>
      <Route path='/login' element={<Login setUser={setUser} setToken={setToken}/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/aboutUs' element={<AboutUs />}/>
      <Route path='/account' element={<Account user={user} setUser={setUser} setToken={setToken} books={books}/>}/>
      <Route path='/checkedBook' element={<CheckedBook />}/>
    </Routes>

      
    </>
  )
}

export default App
