import { useParams } from "react-router-dom"
import {Link} from 'react-router-dom'

const Books = ({books}) => {
    const params = useParams()
    const id = params.id*1




    return(
      <div>

            <h1>Books</h1>
            <h3></h3>
            <ul>
                {
                    books.map((book) =>{
                    return (
                        <li key={book.id}>
                            <Link to={`/books/${book.id}`}> {book.title}</Link>
                        </li>
                    )

                })
                
                }
            </ul>
        
        </div>
    )
}

export default Books