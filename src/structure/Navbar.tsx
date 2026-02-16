import {Container, Nav, Navbar as BsNavbar} from 'react-bootstrap'
import {Link, useLocation} from 'react-router-dom'
import {AppPaths} from "@/utils/constants/routes";

const Navbar = () => {
    const {pathname} = useLocation()

    return (
        <BsNavbar bg="dark" variant="dark" expand="lg">
            <Container>
                <BsNavbar.Toggle/>
                <BsNavbar.Collapse>
                    <Nav>
                        <Nav.Link as={Link} to="/crea-annuncio" active={pathname === AppPaths.CREA_ANNUNCIO}>
                            Crea annuncio
                        </Nav.Link>
                        <Nav.Link as={Link} to="/ricerca-modifica" active={pathname === AppPaths.RICERCA_MODIFICA}>
                            Ricerca
                        </Nav.Link>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    )
}

export default Navbar
