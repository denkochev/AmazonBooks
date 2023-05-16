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
        if (!opt) {
            fetch(env.urlBackend)
                .then(response => response.json())
                .then(json => setBooks(json))
        } else {
            fetch(env.urlBackend+'/sortby/'+opt)
                .then(response => response.json())
                .then(json => setBooks(json));
        }
    }

    const showDBs = () =>{
        fetch(env.serv+'/getdatabases')
            .then(response => response.json())
            .then(json => {
                console.log(json);
            });
    }

    const showCollections = () =>{
        fetch(env.serv+'/getcollections')
            .then(response => response.json())
            .then(json => {
                console.log(json);
            });
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
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>What book do you want</label>

                <div className='main-selector'>
                    <select name="pets" id="pet-select" onChange={sortBy}>
                        <option value="">--Please choose an option--</option>
                        <option value="title">Title</option>
                        <option value="publishedDate">Date</option>
                        <option value="pageCount">Page</option>
                    </select>

                </div>
            </div>
            <div className="App">
                {books.map(el => <Book key={el._id} {...el} />)}
            </div>
            <div className='footer'>
                <button className='foot-btn' onClick={showDBs}><span>Show databases</span></button>
                <button className='foot-btn' onClick={showCollections}><span>Show collections</span></button>
            </div>
        </>
    );
}

export default App;
