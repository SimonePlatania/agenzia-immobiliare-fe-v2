import {Button, Card, Container, Form} from "react-bootstrap";
import {useState} from "react";
const BasicLayout = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <>
             <Container className="d-flex justify-content-center align-items-center vh-100">
                 <Card style={{width: "400px"}} className="p-4">
                     <h3 className="text-center mb-4">Login</h3>
                         <Form>
                             <Form.Group className="mb-3">
                                 <Form.Label>Email:</Form.Label>
                                 <Form.Control
                                     type="email"
                                     placeholder="Inserisci la tua email"
                                     value={email}
                                     onChange={handleEmailChange}/>
                             </Form.Group>
                             <Form.Group className="mb-3">
                                 <Form.Label>Password:</Form.Label>
                                 <Form.Control
                                     type="password"
                                     placeholder="Inserisci la tua password"
                                     value={password}
                                     onChange={handlePasswordChange}/>
                             </Form.Group>
                         </Form>
                     <Button
                         variant="primary"
                         onChange={handleLogin}>
                         Accedi
                     </Button>
                 </Card>
             </Container>
        </>
    )
}

export default BasicLayout;
