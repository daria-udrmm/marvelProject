import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = ({onComicsSelected}) => {
    const [person, setPerson] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(57);
    const [newItemsLoading, setNewItemsLoading] = useState(false);

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        MarvelAllService.getAllComics(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const MarvelAllService = new MarvelService();


    const onCharListLoading = () => {
        setNewItemsLoading(true);
    }

    const onCharListLoaded = (newPerson) => {
        setPerson([...person, ...newPerson]);
        setLoading(false);
        setNewItemsLoading(false);
        setOffset(offset + 9);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const allChar = (person) =>{
        return(
            person.map(item => {
                let imgStyle = {'objectFit' : 'cover'};
                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                    imgStyle = {'objectFit' : 'unset'};
                }
                return(
                    <li className="comics__item" key={item.id} onClick={()=>onComicsSelected(item.id)}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt="abyss" style={imgStyle} className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                )
            })
        )
    }

    const spinner = loading ? <Spinner/> : null;
    const allCharAll = !loading ? allChar(person) : null;

    return(
        <div className="comics__list">
            <ul className="comics__grid">
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

export default ComicsList;