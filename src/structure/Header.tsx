import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppState} from "@/store/store";

const Header = () => {
    const user = useSelector((state: AppState) => state.utente.nome)
    return (
        <Navbar bg="white" className="border-bottom">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <span className="fw-bold">Agenzia immobiliare</span>
                </Navbar.Brand>

                <span className="text-muted">Benvenuto {user}</span>
            </Container>
        </Navbar>
    )
}

export default Header
