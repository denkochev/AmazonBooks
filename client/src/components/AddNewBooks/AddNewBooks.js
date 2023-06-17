import './AddNewBooks.css';
import {useState} from 'react';

const template = [	{
    "title": "",
    "isbn": "",
    "pageCount": 0,
    "publishedDate": "2023-05-01T07:00:00.000Z",
    "thumbnailUrl": "",
    "shortDescription": "",
    "longDescription": "",
    "status": "PUBLISH",
    "authors": [

    ],
    "categories": [

    ]
}]

function AddNewBooks({ onCreate, onDestroy }){
    const urlBackend = process.env.REACT_APP_URL_BACK;
    const [newBooks,setNewBooks] = useState(JSON.stringify(template, null, 2));

    if(!onCreate){
        return null;
    }

    const closeWnd = (event) =>{
        if(event.target.className === 'modal'){
            onDestroy();
        }
    }

    // method for new books adding query
    const addNewBooks = () =>{
        fetch(urlBackend + '/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: newBooks
        }).then(response => response.json())
            .then((req)=>console.log(req))
            .then(()=> onDestroy())
    }

    return (
        <div onClick={closeWnd} className='modal'>
            <div className="modal-content">
                <i onClick={onDestroy} className='close'>X</i>
                <h1>Add new books?</h1>
                <textarea cols="30" rows="20"
                          value={newBooks}
                          onChange={(inp) => setNewBooks(inp.target.value)}
                ></textarea>
                <div className="btns">
                    <button className='accept' onClick={addNewBooks}>Add</button>
                    <button onClick={onDestroy} className='reject'>Close</button>
                </div>
            </div>
        </div>
    );
}

export default AddNewBooks;