class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=7dc91a0a2751e814183c9152feeeaf5c';
    
    _baseOffset = 410;
    _baseComics = 57;
     
     getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok){
            throw new Error('Error');
        }
    
        return await res.json();
    }

    getAllComics = async (offset = this._baseComics) =>{
        const res = await this.getResource(`${this._apiBase}comics?limit=8&offset=${offset}&${this._apiKey}`);
        
        return res.data.results.map(this._transformComics);
    }

    getAllCharacters = async (offset = this._baseOffset) =>{
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        
        return res.data.results.map(this._transformCharacter );
    }

    getCharacter = async (id) =>{
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

        return this._transformCharacter(res.data.results[0]);
    }

    getComic = async (id) => {
        const res = await this.getResource(`${this._apiBase}comics/${id}?${this._apiKey}`);

        return this._transformComics(res.data.results[0]);
    }

    _transformCharacter = (char) =>{
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    _transformComics = (char) =>{
        return {
            id: char.id,
            title: char.title,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            price: char.prices[0].price + '$',
            language: 'en'
        }
    }

}

export default MarvelService;