import Button from './Button'
import Logo from './Logo'

function Sidebar() {
    return (
        <div className="row-span-full flex flex-col  gap-[3.2rem] border-r border-mako-grey-100 bg-picton-blue-50 px-[2.4rem] py-[3.2rem]">
            <Logo></Logo>
            <MainNav></MainNav>
        </div>
    )
}

export default Sidebar
