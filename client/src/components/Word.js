import './Word.css';

function Word({_id, artikel, word, translation, date}) {
    const datetime = new Date(date);

    return (
        <div className="Word">
            <h2>{artikel} {word} -- {translation}</h2>
            <i>{date ? `${datetime}` : ''}</i>
        </div>
    );
}

export default Word;