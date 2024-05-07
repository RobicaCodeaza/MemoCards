import { Outlet } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import Sidebar from './Sidebar'
import Container from './Container'

function AppLayout() {
    return (
        <div className="bg-blue-50 grid min-h-screen grid-cols-[26rem_1fr] grid-rows-[auto_1fr]">
            <Sidebar></Sidebar>
            <Header></Header>
            <Main>
                <Container>
                    <Outlet></Outlet>
                </Container>
            </Main>
        </div>
    )
}

export default AppLayout
