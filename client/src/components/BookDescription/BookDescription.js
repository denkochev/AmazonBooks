import './BookDescription.css';

function BookDescription({
                             call,
                             onDestroy,
                             _id,
                             isbn,
                             title,
                             pageCount,
                             publishedDate,
                             shortDescription,
                             longDescription,
                             authors,
                             categories,
                             moviesOnBook,
                             thumbnailUrl,
                             status
                         }) {
    const datetime = new Date(publishedDate);

    if (!call) {
        return null;
    }

    return (
        <div className='modal'>
            <div className="modal-content">
                <i onClick={onDestroy} className='close'>X</i>
                {thumbnailUrl ? (
                        <img src={thumbnailUrl} alt="cover" align="left" vspace="5" hspace="5"/>)
                    : null}
                <h1>{title}</h1>
                <h3>ISBN: {isbn}</h3>
                <h2>Кількість сторінок:</h2><p>{pageCount} ст.</p>
                <h2>Автори:</h2><p>{authors?authors.join(', '):null}</p>
                <h2>Дата публікації:</h2><p>{publishedDate ? `${datetime}` : 'інформація відсутня'}</p>
                <h2>Категорії</h2><p>{categories?categories.join(', '):null}</p>
                <h2>Опис:</h2><p>{longDescription}</p>
                <h2>Фільми:</h2><p>{moviesOnBook ? moviesOnBook.map((film, idx) => <span
                    key={idx}>Назва - {film.name} Продюсер - {film.producer}; </span>)
                : 'інформація відсутня'}</p>
                <div className="btns">
                    <button className='accept'>Так, видалити</button>
                    <button onClick={onDestroy} className='reject'>Ні, залишити</button>
                </div>
            </div>
        </div>
    );
}

export default BookDescription;