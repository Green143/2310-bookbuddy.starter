
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CheckedBook from "./CheckedBook"



const Account = ({user, setUser, setToken }) => {
    const navigate = useNavigate()
    const [reserve, setReserve] = useState([])

    useEffect (() =>{
        const fetchRBooks = async() =>{

            const loggedInToken = window.localStorage.getItem( 'token')
            if(loggedInToken){
                const {data} = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loggedInToken}`
                  }
                })
        
                setReserve(data.reservation)
              }else{
                
                throw 'no token'
              }
        
            }
            
            fetchRBooks()
        },[])
    
        const deleteReserve = async (reserveId) => {
            const loggedInToken = window.localStorage.getItem( 'token')
            if(loggedInToken){
                const response = await axios.delete(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reserveId}`, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loggedInToken}`
                  }
                })
        
                setReserve(reserve.filter((checkedBook) => {return checkedBook.id !== reserveId}))
              }else{
                
                throw 'no token'
              }
        
            }
            
       

    const logout = () => {
        window.localStorage.removeItem('token');
        setToken(null)
        setUser({})
        navigate('/')
    }

    if(!user.books){
        return null
        
    }
    
    return(
        <div>
            <h1>Account</h1>
            <button onClick={() => {logout()}}>Logout</button>
            <hr/>
            <h2>Email: {user.email}</h2> 
            <h3> Your Reserved Books:</h3>
            <ul>
                {
                    reserve.map((reserved) =>{
                        return(
                            <li key={reserved.id}><h2>{reserved.title}</h2>
                            <button onClick={()=> {deleteReserve(reserved.id)}}>Check In Book {reserved.title}</button>
                            </li>
                        )
                    })
                }
            </ul>
            
        </div>
    )
}
export default Account