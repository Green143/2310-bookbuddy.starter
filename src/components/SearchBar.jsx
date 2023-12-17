import { useState } from "react"
// dependencies use numbers, so you can use the book id as a variable to watch for in useEffect
//Creating a search bar so we can see the results

const SearchBar =({books}) =>{
    const [searchTerm, setSearchTerm] = useState ('')

    const filteredTerms = books.filter((book) =>{
        return book.title.indexOf( searchTerm) !== -1

    })

//below is the input field that the user will add the search term into
    return (
        <div>
            <label> 
                <input type="text" value={searchTerm} 
                onChange={(event) => {setSearchTerm(event.target.value)}}
                />
            </label>
                {
                searchTerm.length > 0 ?
                <div>
                    <h3>Viewing {filteredTerms.length} of {books.length}</h3> 
                    <ul>
                        {
                            filteredTerms.map((book)=> {
                                return <li key={book.id}>{book.title} </li>
                            })
                            
                        }
                    </ul> 
                </div> 
                : null

            }
        </div>
    )
}
export default SearchBar