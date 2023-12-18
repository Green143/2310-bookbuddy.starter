import axios from "axios";
import { useParams } from "react-router-dom";
import SingleBooks from "./SingleBooks";

const CheckedBook = ({books}) =>{

    const params = useParams()
    const id = params.id*1

    const checkedBook = books.find((book) =>{
        return id === book.id
        //console.log(id)
    })
    const handleSubmit =async (event) =>{
        event.preventDefault()


            const loggedInToken = window.localStorage.getItem( 'token')
    
            if (loggedInToken) {
                const response= await axios.patch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${checkedBook.id}`, 
                {available: false}, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loggedInToken}`
                      }
    
                })
                console.log(response)
            }else{
            
                throw 'no token'
                }
    }
            return(
                
                <div> 
                
                    <button onClick={handleSubmit}> Click here to check out this book.</button>
                </div>
            )
}
export default CheckedBook