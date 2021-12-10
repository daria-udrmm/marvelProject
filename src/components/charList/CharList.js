import { useState, useEffect, useRef } from 'react';

import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

const CharList = (props) => {

    const [persone, setPerson] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(410);
    const [newItemsLoading, setNewItemsLoading] = useState(false);

    const MarvelSAllervice = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);
    //useEffect запускается после рендера, поэтому стрелочную функцию можно вызывать выше места объявления
    
    const onRequest = (offset) => {
        onCharListLoading();

        MarvelSAllervice.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemsLoading(true);
    }

    const onCharListLoaded = (newPersone) => {

        setPerson(persone => [...persone, ...newPersone]);
        setLoading(false);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);

    }

    const updateCharactets = () => {
        onRequest();
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    function allChar(persone){
        return(
            persone.map(item => {
                let imgStyle = {'objectFit' : 'cover'};
                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                    imgStyle = {'objectFit' : 'unset'};
                }
                return(
                    <li className="char__item" key={item.id} onClick={()=>props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )
            })
        )
    }

    // console.log(this.state);
    // const {loading, offset, newItemsLoading} = this.state;
    const spinner = loading ? <Spinner/> : null;
    const allCharAll = !loading ? allChar(persone) : null;
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