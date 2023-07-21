import Book from './components/Book/Book';
import AddNewBooks from "./components/AddNewBooks/AddNewBooks";
import {useEffect, useState} from "react";

function App() {
    const urlBackend = process.env.REACT_APP_URL_BACKEND;
    console.log(urlBackend)
    const server = process.env.REACT_APP_SERVER;
    const [books, setBooks] = useState([]);
    const [checkedIDs, setCheckedIDs] = useState([]);
    const [mainInpValue,setMainInpValue] = useState('');
    const [addNewBooksStatus,setAddNewBooksStatus] = useState(false);

    // handle checked checkbox from components Book
    const handleCheckedIDs = (idChecked, isChecked) => {
        if (isChecked) {
            setCheckedIDs([...checkedIDs, idChecked]);
        } else {
            const unCheckedValues = checkedIDs.filter(id => idChecked !== id);
            setCheckedIDs(unCheckedValues);
        }
    };

    useEffect(() => {
        fetch(urlBackend)
            .then(response => response.json())
            .then(json => setBooks(json))
    }, [urlBackend]);

    const searchByWord = (event) => {
        const inp = event.target.value;
        setMainInpValue(inp);

        fetch(urlBackend + '/' + inp)
            .then(response => response.json())
            .then(json => setBooks(json))
    }

    const sortBy = (event) => {
        const opt = event.target.value;
        if (!opt) {
            fetch(urlBackend)
                .then(response => response.json())
                .then(json => setBooks(json))
        } else {
            fetch(urlBackend + '/sortby/' + opt)
                .then(response => response.json())
                .then(json => setBooks(json));
        }
    }

    const showDBs = () => {
        fetch(server + '/getdatabases')
            .then(response => response.json())
            .then(json => {
                console.log(json);
            });
    }

    const showCollections = () => {
        fetch(server + '/getcollections')
            .then(response => response.json())
            .then(json => {
                console.log(json);
            });
    }

    const deleteMany = () => {
        fetch(urlBackend + '/deletemany', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkedIDs)
        }).then(response => response.json())
            .then(json => {
                console.log(json);
            }).then( ()=>{
                fetch(urlBackend + '/' + mainInpValue)
                    .then(response => response.json())
                    .then(json => setBooks(json))
                    .then(()=>setCheckedIDs([]));
            }
        )
    }

    // props func for deleting one book from modal window
    const deleteOne = (id) =>{
        if(!id) return
        const forDeleting = [id];
        fetch(urlBackend + '/deletemany', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(forDeleting)
        }).then(response => response.json())
            .then(json => {
                console.log(json);
            }).then( ()=>{
                fetch(urlBackend + '/' + mainInpValue)
                    .then(response => response.json())
                    .then(json => setBooks(json))
            }
        )
    }

    const editDone = () =>{
        fetch(urlBackend + '/' + mainInpValue)
            .then(response => response.json())
            .then(json => setBooks(json));
    }

    return (
        <>
            <section className='head-site'>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <h1 className="App">Amazon books (NoSQL module)</h1>
                </div>
            </section>
            <div className='for-main-inp'>
                <input type="text" className='main-inp' onChange={searchByWord} value={mainInpValue}/>
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
                {books.map(el => <Book key={el._id} {...el} onCheckboxChange={handleCheckedIDs} onDelete={deleteOne} onEdit={editDone}/>)}
            </div>
            <AddNewBooks onCreate={addNewBooksStatus} onDestroy={()=>setAddNewBooksStatus(false)}/>
            <div className='footer'>
                <button className='foot-btn' onClick={deleteMany}><span>Delete selected</span></button>
                <button className='foot-btn' onClick={()=>setAddNewBooksStatus(true)}><span>Add new book</span></button>
                <button className='foot-btn' onClick={showDBs}><span>Show databases</span></button>
                <button className='foot-btn' onClick={showCollections}><span>Show collections</span></button>
            </div>
        </>
    );
}

export default App;
