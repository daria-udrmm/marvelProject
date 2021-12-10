import img from './error.gif'

const ErrorMessage = () => {
    return (
        // <img src={process.env.PUBLIC_URL + '/error.gif'}></img> если картинка в папке public
        <img src={img} style={{maxWidth: '260px', margin: '0 auto'}}></img>
    )
}

export default ErrorMessage;