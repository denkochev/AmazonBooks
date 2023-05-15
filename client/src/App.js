import Book from './components/Book/Book';
import env from './credentials/env.json';
import {useEffect, useState} from "react";

function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(env.urlBackend)
            .then(response => response.json())
            .then(json => setBooks(json))
    }, []);

    const searchByWord = (event) =>{
        const word = event.target.value;
        fetch(env.urlBackend+'/'+word)
            .then(response => response.json())
            .then(json => setBooks(json))
    }

    const sortBy = (event) =>{
        const opt = event.target.value;
        fetch(env.urlBackend+'/sortby/'+opt)
            .then(response => response.json())
            .then(json => setBooks(json))
    }

    return (
        <>
            <section className='head-site'>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <h1 className="App">Amazon books (NoSQL module)</h1>
                </div>
            </section>
            <div className='for-main-inp'>
                <input type="text" className='main-inp' required onChange={searchByWord}/>
                <div className='main-selector'>
                    <select name="pets" id="pet-select" onChange={sortBy}>
                        <option value="">--Please choose an option--</option>
                        <option value="title">Title</option>
                        <option value="publishedDate">Date</option>
                        <option value="pageCount">Page</option>
                    </select>

                </div>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Type name book</label>
            </div>
            <div className="App">
                {books.map(el => <Book key={el._id} {...el} />)}
            </div>
        </>
    );
}

export default App;
