import './Book.css';
import BookDescription from "../BookDescription/BookDescription";
import {useState} from "react";

function Book({_id, title, pageCount, publishedDate, shortDescription,longDescription,authors,categories,moviesOnBook,thumbnailUrl}) {
    const datetime = new Date(publishedDate);
    // set modal state
    const [modalBookDescription, setModalBookDescription] = useState(false);
    const props = {...arguments[0]};

    return (
        <div className="Book">
            <input type="checkbox"/>
            <img src={thumbnailUrl} alt=""/>
            <h2>{title}</h2>
            <p>{pageCount?pageCount+' ст.':null}</p>
            <p>{authors.join(' ')}</p>
            <p>{shortDescription}</p>
            <i>{publishedDate ? `${datetime}` : ''}</i>
            <BookDescription call={modalBookDescription} onDestroy={()=> setModalBookDescription(false)}  {...props}/>
            <button onClick={()=> setModalBookDescription(true)}>Open book</button>
        </div>
    );
}

export default Book;