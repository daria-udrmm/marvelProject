import { Component } from 'react';

import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './comicsList.scss';
// import uw from '../../resources/img/UW.png';
// import xMen from '../../resources/img/x-men.png';

class ComicsList extends Component {

    state = {
        persone: [],
        loading: true,
        error: false,
        offset: 57,
        newItemsLoading: false
    }

    componentDidMount(){
        this.onRequest();
        console.log('render');
    }
    componentDidUpdate(){
        console.log('render2');
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.MarvelSAllervice.getAllComics(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    MarvelSAllervice = new MarvelService();


    onCharListLoading = () => {
        this.setState({newItemsLoading : true})
    }

    onCharListLoaded = (newPersone) => {
        // this.setState({char : char}) ниже сокращенная форма
        //char ниже это state.char, в который будет приходит char из аргумента (т.е. см. выше)
        //и заполняться name, description и т.д.
        //то есть char из state.char будет равен char (char который выше и приходит в кач-ве аргумента)

        //callback функция нужна потому что текущее состояние будет завсиеть от предыдущего
        // Скобки () после => обзначают возвращение объекта из этой функции
        this.setState(({persone, offset})=>({
            persone: [...persone, ...newPersone],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
        }));
        // console.log(this.state.offset);
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    allChar = (persone) =>{
        return(
            persone.map(item => {
                let imgStyle = {'objectFit' : 'cover'};
                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                    imgStyle = {'objectFit' : 'unset'};
                }
                return(
                    <li className="comics__item" key={item.id} onClick={()=>this.props.onComicsSelected(item.id)}>
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

    render(){
        // console.log(this.state);
        const {loading, offset, newItemsLoading} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const allCharAll = !loading ? this.allChar(this.state.persone) : null;
        return (
            <div className="comics__list">
                <ul className="comics__grid">
                    {spinner}
                    {allCharAll}
                </ul>
                <button
                onClick={() => this.onRequest(offset)}
                disabled={newItemsLoading}
                className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default ComicsList;