import {Container, Dropdown, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "@/store/store";
import {capitalize} from "lodash";
import {AppPaths} from "@/utils/constants/routes";
import {useLogoutUserMutation} from "@/api/utenteApi";
import {setLogoutUtente} from "@/store/slices/utenteSlice";
import {setGrowl} from "@/store/slices/uiSlice";
import {createErrorGrowl} from "@/custom/modal/Growl";
// @ts-ignore
import logo from "@/img/logo.jpg";

const Header = () => {
    const [logoutUser, {isLoading, error}] = useLogoutUserMutation();
    const user = useSelector((state: AppState) => state.utente)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const utente = () => user?.nome + " " + user?.cognome + " (" + capitalize(user?.ruolo) + ")"

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(setLogoutUtente());
            navigate(AppPaths.LOGIN)
        } catch (err: any) {
            const messaggio = err?.data?.messaggio || "Errore generico"
            dispatch(setGrowl(createErrorGrowl(messaggio)));
        }
    };

    return (
        <Navbar bg="white" className="border-bottom">
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Brand as={Link} to={AppPaths.RICERCA_MODIFICA} className="d-flex align-items-center gap-2">
                    <img
                        src={logo}
                        alt="Logo"
                        height={160}
                        style={{mixBlendMode: "multiply"}}
                    />
                    <span className="fw-bold">Agenzia immobiliare</span>
                </Navbar.Brand>

                <Dropdown>
                    <Dropdown.Toggle>
                        <span className="d-none d-md-inline">Utente: {utente()}</span>
                        <i className="bi bi-person-fill d-md-none"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item>
                            <i className="bi bi-gear-fill"></i> | Impostazioni
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                            <i className="bi bi-door-closed-fill"></i> | Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    )
}

export default Header
