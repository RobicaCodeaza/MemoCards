import logo from '../../public/logo.png'

type LogoTypePhone = {
    height: 'small' | 'medium' | 'big'
}

function Logo({ height }: LogoTypePhone) {
    return (
        <div
            className={`flex ${height === 'medium' && 'h-16'}
            ${height === 'big' && 'h-24'}
            ${height === 'small' && 'h-14'}
            justify-center particular-small-laptop:h-16`}
        >
            <img className="object-contain" alt="Logo" src={logo}></img>
        </div>
    )
}

export default Logo
