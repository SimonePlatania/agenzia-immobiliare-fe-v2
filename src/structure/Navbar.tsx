import { Container, Nav, Navbar as BsNavbar } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { AppPaths } from "@/utils/constants/routes"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/store/store"
import { Ruolo, Sections } from "@/utils/constants/consts"
import { setSection } from "@/store/slices/sectionSlice"

const Navbar = () => {
    const { pathname } = useLocation()
    const { ruolo: ruoloUtente } = useSelector(
        (state: AppState) => state.utente
    )
    const isAdmin = ruoloUtente === Ruolo.AMMINISTRATORE
    const dispatch = useDispatch()
    const section = useSelector((state: AppState) => state.section)

    return (
        <BsNavbar bg="dark" variant="dark" expand="lg">
            <Container>
                <BsNavbar.Toggle />
                <BsNavbar.Collapse>
                    <Nav>
                        {isAdmin && (
                            <Nav.Link
                                as={Link}
                                to={AppPaths.CREA_ANNUNCIO}
                                onClick={() =>
                                    dispatch(setSection(Sections.ACQUISIZIONE))
                                }
                                active={pathname === AppPaths.CREA_ANNUNCIO}
                            >
                                Crea annuncio
                            </Nav.Link>
                        )}
                        <Nav.Link
                            as={Link}
                            to={AppPaths.RICERCA_MODIFICA}
                            onClick={() =>
                                dispatch(setSection(Sections.RICERCA))
                            }
                            active={pathname === AppPaths.RICERCA_MODIFICA}
                        >
                            Ricerca
                        </Nav.Link>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    )
}

export default Navbar
