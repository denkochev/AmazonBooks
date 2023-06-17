import './Book.css';
import BookDescription from "../BookDescription/BookDescription";
import {useState} from "react";

function Book({_id, title, pageCount, publishedDate, shortDescription,longDescription,authors,categories,moviesOnBook,thumbnailUrl,onCheckboxChange}) {
    const datetime = new Date(publishedDate);
    // set modal state
    const [modalBookDescription, setModalBookDescription] = useState(false);
    const props = {...arguments[0]};

    // checkbox handler
    const handleCheckboxChange = (event) => {
        const checkboxId = _id;
        const isChecked = event.target.checked;
        onCheckboxChange(checkboxId, isChecked);
    };

    return (
        <div className="Book">

            <label className="container">
                <input type="checkbox" onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
            </label>

            {thumbnailUrl?<img src={thumbnailUrl} style={{height:"230px"}} alt=""/> : null }
            <h2>{title}</h2>
            <p>{pageCount?pageCount+' ст.':null}</p>
            <p>{authors?authors.join(' '):null}</p>
            <p>{shortDescription}</p>
            <i>{publishedDate ? `${datetime}` : ''}</i>
            <BookDescription onCreate={modalBookDescription} onDestroy={()=> setModalBookDescription(false)}  {...props}/>
            <button onClick={()=> setModalBookDescription(true)}>Open book</button>
        </div>
    );
}

export default Book;