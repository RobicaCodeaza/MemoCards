import { Outlet } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import Sidebar from './Sidebar'
import Container from './Container'

function AppLayout() {
    return (
        <div className="grid h-screen grid-cols-[1fr] grid-rows-[auto_1fr] tab-port:grid-cols-[20rem_1fr] tab-land:grid-cols-[20rem_1fr]">
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
