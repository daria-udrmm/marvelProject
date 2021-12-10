import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from '../comicsList/ComicsList';
import AppBanner from "../appBanner/AppBanner";
import decoration from '../../resources/img/vision.png';


//ленивая подгрузка
const SingleComicsPage = lazy(() => import('../singleComicsPage/SingleComicsPage'))

const App = () => {

    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id);
    }

    const [selectedComics, setComics] = useState(null)

    const onComicsSelected = (id) => {
        setComics(id);
    }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <Switch>
                        <Route exact path="/">
                            <RandomChar/>
                            <div className="char__content">
                                <CharList onCharSelected={onCharSelected}/>
                                <CharInfo charId={selectedChar}/>
                            </div>
                            <img className="bg-decoration" src={decoration} alt="vision"/>
                        </Route>
                        <Route exact path="/comics">
                            <AppBanner/>
                            <ComicsList onComicsSelected={onComicsSelected}/>
                        </Route>
                        <Route exact path="/comics/:comicId">
                            <SingleComicsPage/>
                        </Route>
                        <Route exact path="/*">
                            <RandomChar/>
                            <div className="char__content">
                                <CharList onCharSelected={onCharSelected}/>
                                <CharInfo charId={selectedChar}/>
                            </div>
                            <img className="bg-decoration" src={decoration} alt="vision"/>
                        </Route>
                    </Switch>
                </Suspense>
                </main>
            </div>
        </Router>
    )

}

export default App;