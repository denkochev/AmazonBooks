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

    return (
        <>
            <section className='head-site'>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <h1 className="App">Amazon books (NoSQL module)</h1>
                </div>
            </section>
            <div className='for-main-inp'>
                <input type="text" className='main-inp' required/>
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
