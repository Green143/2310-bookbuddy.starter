import { useParams, Link } from "react-router-dom"
import CheckedBook from "./CheckedBook"

const SingleBooks = ({books}) => {

    const params = useParams()
    const id = params.id*1
    let bookAvail=""

    const book = books.find((book) => {
        return id === book.id
        //console.log(id)
    })
    
    if(book){
         bookAvail= book.available ? "This Book is Available to Check out!" : "Come back later."
        //return null
    } else {
        
    }
    
            return (
                <div><center>
                    <h1>Book Details</h1>
                    <h2>{book?.title}</h2>
                    <img className="bookimg" src={book?.coverimage} />
                    <h3> By: {book?.author}</h3> <p>{book?.description}</p>

                    <CheckedBook books={books}/>
                    <h3> Availability: {bookAvail}</h3>
                    <Link to='/books'> Go Back to the Library </Link>
                
                </center></div>

            )
    }


export default SingleBooks