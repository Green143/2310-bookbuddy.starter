
import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



axios.patch

const Account = ({user, setUser, setToken }) => {
    const navigate = useNavigate()
    
    useEffect(() => {

    
    const checkOutBooks= async () =>{
        const loggedInToken = window.localStorage.getItem( 'token')

        if (loggedInToken) {
            const response= await axios.patch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/:bookId', 
            {available: false}, 
            {
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
    checkOutBooks ()
})  





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
            <h4>This could be a good place to show checked out books...</h4>
            
            
           
        </div>
    )
}

export default Account