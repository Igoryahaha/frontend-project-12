import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';

const Header = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {auth.loggedIn && <Button onClick={auth.logOut}>{t('logout')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
