import { Container, Navbar } from "react-bootstrap";
import logo from '../logo.svg';

export default function Bar() {
    return(
        <>
        <Navbar bg="light" variant="light">
            <Container>
            <Navbar.Brand href="#home">
                <img
                alt="Logo Medi App"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                Medi App
            </Navbar.Brand>
            </Container>
        </Navbar>
        </>
    );
}