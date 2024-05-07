import logo from '../../public/logo.png'

function Logo() {
    return (
        <div className="flex justify-center particular-small-laptop:h-24">
            <img className="object-contain" alt="Logo" src={logo}></img>
        </div>
    )
}

export default Logo
