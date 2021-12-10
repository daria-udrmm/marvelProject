import { Component } from 'react';


import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        // name: null,
        // description: null,
        // thumbnail: null,
        // homepage: null,
        // wiki: null
        loading: true,
        error: false
    }

    componentDidMount(){
        this.updateChar();
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        // this.setState({char : char}) ниже сокращенная форма
        //char ниже это state.char, в который будет приходит char из аргумента (т.е. см. выше)
        //и заполняться name, description и т.д.
        //то есть char из state.char будет равен char (char который выше и приходит в кач-ве аргумента)
        this.setState({char, loading: false})

    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
            //в then(this.onCharLoaded) аргумент приходит автоматически
    }

    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        //char={char} передает объект в объекте {char: {...}, {...}, {...}}
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {/* {loading ? <Spinner/> : <View char={char}/>} */}
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar} >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {

    //мы передаем объект, в котором лежит char вида:
    //{char:{...}}
    //чтобы вытащить сами объекты нужно деструктурировать этот оюъект
    //{char} будет в себе уже содержать свойства каждого элемента id, name, description.
    //Все, чтобы было непосредственно в объекте char

    const {name, description, thumbnail, homepage, wiki} = char;
    
    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;