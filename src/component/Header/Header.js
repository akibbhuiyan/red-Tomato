import React from 'react';
import logo from '../../images/logo2.png'
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom';

// const Header = () => {
//     return (
//         <>
//             <header>
//                 <div className="logo">
//                     <img src={logo} alt="LOGO" />
//                 </div>
//                 <nav>
//                     <Link to='/cart'><span><FiShoppingCart /></span></Link>
//                     <Link to='/login'>Login</Link>
//                     <Link to='/signin'>
//                         <button className='main-btn'>Sign up</button>
//                     </Link>
//                 </nav>
//             </header>
//         </>
//     );
// };

// export default Header;
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand className='header'><Link to='/home'><img src={logo} alt="LOGO" /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to='/cart'><span><FiShoppingCart /></span></Link>
                        <Link to='/login'>Login</Link>
                        <Link to='/signin'>
                            <button className='main-btn'>Sign up</button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;