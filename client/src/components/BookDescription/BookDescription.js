import './BookDescription.css';
import {useState, useRef} from 'react';

function BookDescription({
                             onCreate,
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
                             status,
                             onDelete,
                             onEdit
                         }) {
    const urlBackend = process.env.REACT_APP_URL_BACK;
    const datetime = new Date(publishedDate);
    // preparing object for editor
    const props = {...arguments[0]};
    delete props._id
    delete props.onCreate;
    delete props.onDelete;
    delete props.onDestroy;
    delete props.onCheckboxChange;
    delete props.onEdit;

    const [editor, setEditor] = useState(false);
    const [editorValue, setEditorValue] = useState(JSON.stringify(props, null, 2));
    const textareaRef = useRef(null);

    if (!onCreate) {
        return null;
    }

    // auto size for textarea
    const handleTAreaSize = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Спочатку встановлюємо висоту в 'auto', щоб він зміщувався правильно
        textarea.style.height = `${textarea.scrollHeight}px`; // Встановлюємо висоту залежно від змісту
    };

    // query method for edit book
    const editDocument = () => {
        fetch(urlBackend + '/update/' + _id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: editorValue
        }).then(response => response.json())
            .then(res => console.log(res))
            .then(()=>{
                onEdit();
                onDestroy()
            })
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
                <h2>Автори:</h2><p>{authors ? authors.join(', ') : null}</p>
                <h2>Дата публікації:</h2><p>{publishedDate ? `${datetime}` : 'інформація відсутня'}</p>
                <h2>Категорії</h2><p>{categories ? categories.join(', ') : null}</p>
                <h2>Опис:</h2><p>{longDescription}</p>
                <h2>Фільми:</h2><p>{moviesOnBook ? moviesOnBook.map((film, idx) => <span
                    key={idx}>Назва - {film.name} Продюсер - {film.producer}; </span>)
                : 'інформація відсутня'}</p>
                {editor ? (
                    <>
                        <h2>Edit this book</h2>
                        <div className='editor-text-area'>
                            <textarea value={editorValue} ref={textareaRef}
                                      onClick={handleTAreaSize}
                                      onChange={(inp) => setEditorValue(inp.target.value)}/>
                            <button onClick={editDocument}>Save changes</button>
                        </div>
                    </>
                ) : null}
                <div className="btns">
                    <button className='edit' onClick={() => setEditor(!editor)}>Редагувати</button>
                    <button className='accept' onClick={() => {
                        onDelete(_id);
                        onDestroy();
                    }}>Видалити
                    </button>
                    <button onClick={onDestroy} className='reject'>Вийти
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookDescription;