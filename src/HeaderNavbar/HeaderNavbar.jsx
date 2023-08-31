import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function HeaderNavbar() {
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    // Focus the first link when the component mounts
    if (navRef.current) {
      const links = navRef.current.querySelectorAll('a');
      if (links.length > 0) {
        links[0].focus();
      }
    }
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      const activeElement = document.activeElement;
      if (activeElement.nextSibling) {
        activeElement.nextSibling.focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const activeElement = document.activeElement;
      if (activeElement.previousSibling) {
        activeElement.previousSibling.focus();
      }
    }
  };

  return (
    <>
      <Navbar expand="lg" className="absolute top-0 z-50">
        <Container fluid className='py-4'>
          <Link onClick={() => navigate(0)}><img src="https://cloud.watch4.com/uploads/wedotv-12_logo.png" className='w-56 items-center cursor-pointer' alt="" /></Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              ref={navRef}
              className="me-auto ms-10  my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
              onKeyDown={handleKeyDown}
            >
              <Link to="/" className='text-white  font-semibold text-3xl px-3 py-2' style={{ textDecoration: "none" }}>Home</Link>
              <Link to="/Movies" className='text-white  font-semibold text-3xl px-3 py-2' style={{ textDecoration: "none" }}>Movies</Link>
              <Link to="/Series" className='text-white  font-semibold text-3xl px-3 py-2' style={{ textDecoration: "none" }}>Series</Link>
              <Link to="/Sport" className='text-white font-semibold text-3xl px-3 py-2' style={{ textDecoration: "none" }}>Sports</Link>
              <Link to="/" className='text-white font-semibold text-3xl px-3 py-2' style={{ textDecoration: "none" }}>Live</Link>
              <Link to="/Privacy" className='text-white font-semibold text-3xl px-3 py-2' style={{ textDecoration: "none" }}>Privacy</Link>
              <Link to="/Terms" className='text-white font-semibold text-3xl px-3 py-2' style={{ textDecoration: "none" }}>Teams</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default HeaderNavbar;
