import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = ({onCharSelected}) => {

    const [person, setPerson] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(410);
    const [newItemsLoading, setNewItemsLoading] = useState(false);

    const MarvelAllService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);
    
    const onRequest = (offset) => {
        onCharListLoading();

        MarvelAllService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemsLoading(true);
    }

    const onCharListLoaded = (newPerson) => {

        setPerson(person => [...person, ...newPerson]);
        setLoading(false);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);

    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    function allChar(person){
        return(
            person.map(item => {
                let imgStyle = {'objectFit' : 'cover'};
                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                    imgStyle = {'objectFit' : 'unset'};
                }
                return(
                    <li className="char__item" key={item.id} onClick={()=>onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )
            })
        )
    }

    const spinner = loading ? <Spinner/> : null;
    const allCharAll = !loading ? allChar(person) : null;
    return (
        <div className="char__list">
            <ul className="char__grid">
                {spinner}
                {allCharAll}
            </ul>
            <button
            onClick={() => onRequest(offset)}
            disabled={newItemsLoading}
            className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default CharList;