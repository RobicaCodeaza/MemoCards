import logo from '../../public/logo.png'

function Logo() {
    return (
        <div className="flex h-12 justify-center particular-small-laptop:h-16">
            <img className="object-contain" alt="Logo" src={logo}></img>
        </div>
    )
}

export default Logo
