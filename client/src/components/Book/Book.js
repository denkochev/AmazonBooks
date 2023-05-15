import './Book.css';

function Book({_id, title, pageCount, publishedDate, shortDescription,authors,categories,moviesOnBook,thumbnailUrl}) {
    const datetime = new Date(publishedDate);

    return (
        <div className="Book">
            <input type="checkbox"/>
            <img src={thumbnailUrl} alt=""/>
            <h2>{title}</h2>
            <p>{authors.join(' ')}</p>
            <p>{shortDescription}</p>
            <i>{publishedDate ? `${datetime}` : ''}</i>
            <button>Open book</button>
        </div>
    );
}

export default Book;