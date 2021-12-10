
import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps){
        if (this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

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
        const {charId} = this.props;
        //this.props - возвращает нам объект, а charId его значение
        //this.props {charId: {...}}, а charId возвращает непосредсттенно значения charId
        
        if (!charId){
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render(){
        const {char, loading, error} = this.state;
        
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info" onClick={this.updateChar}>
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}


const View = ({char}) => {

    let imgStyle = {'objectFit' : 'cover'};
    if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit' : 'unset'};
    }

    return(
        <>
            <div className="char__basics">
                <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description.length > 0 ? char.description : 'There is no description for this character'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {char.comics.length > 0 ? null : 'There is no comics with this character'}
                {char.comics.map((item, i) => {
                    if (i > 3){
                        return;
                    }
                    return(
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })}
                 
            </ul>
        </>
    )
}

export default CharInfo;