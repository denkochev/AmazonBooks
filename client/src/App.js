import Word from './components/Word';
import env from './credentials/env.json';
import {useEffect, useState} from "react";


function App() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        fetch(env.urlBackend)
            .then(response => response.json())
            .then(json => setWords(json))
    }, []);

    return (
        <>
            <section className='head-site'>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <h1 className="memember">Amazon books</h1>
                    {/*<h3>Easiest way to remember</h3>*/}
                </div>
            </section>
            <div className="App">
                {words.map(el => <Word key={el._id} {...el} />)}
            </div>
        </>
    );
}

export default App;
