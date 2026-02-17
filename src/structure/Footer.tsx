import {Container} from 'react-bootstrap'
// @ts-ignore
import logo from "@/img/logo.jpg";

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-3 mt-auto">

            <Container className="text-center">

                <p className="mb-0">
                    &copy; {new Date().getFullYear()} Agenzia immobiliare. Tutti i diritti riservati.
                </p>
                <img
                    src={logo}
                    alt="Logo"
                    height={60}
                    style={{mixBlendMode: "multiply"}}
                />
            </Container>
        </footer>
    )
}

export default Footer
