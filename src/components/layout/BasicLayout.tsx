import { Container } from "react-bootstrap"
import Footer from "@/structure/Footer"
import Header from "@/structure/Header"
import Navbar from "@/structure/Navbar"
import { useLocation } from "react-router-dom"
import { AppPaths } from "@/utils/constants/routes"
import MainContent from "@/components/main/MainContent"
import Growl from "@/custom/modal/Growl"
import SidebarMenu from "@/structure/SidebarMenu"

const BasicLayout = () => {
    const { pathname } = useLocation()
    const isAuthPage = [AppPaths.LOGIN, AppPaths.REGISTER].includes(
        pathname as AppPaths
    )

    return (
        <div className="d-flex flex-column min-vh-100">
            {!isAuthPage && <Header />}
            {!isAuthPage && <Navbar />}
            <Growl />

            <Container as="main" className="flex-grow-1 pt-2 pb-4">
                {!isAuthPage ? (
                    <div className="d-flex gap-4">
                        <SidebarMenu />
                        <div className="flex-grow-1" style={{ minWidth: 0 }}>
                            <MainContent />
                        </div>
                    </div>
                ) : (
                    <MainContent />
                )}
            </Container>

            {!isAuthPage && <Footer />}
        </div>
    )
}

export default BasicLayout
