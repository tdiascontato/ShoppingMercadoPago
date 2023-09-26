import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Side, Button, Img } from './IndexStyle';

export const NavBar = ({modeScreen},received) => {
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem("loggedIn"));
    useEffect(() => {
        setIsLoggedIn(window.localStorage.getItem("loggedIn"));
      }, []);
    return(
        <Container>
            
               <Link to="/">
                    <Img src= "bee-hive.png" alt='Logo'/>
                </Link>   
            
            <Side>
                <Link to="/login">
                    <Button className='NavButton' >
                        {isLoggedIn ? "Dashboard" : "Login"}
                    </Button>
                </Link>
                <Link to="/cadastro">
                    <Button className='NavButton'>
                        Cadastro
                    </Button>
                </Link>
                <Button className='NavButton' onClick={modeScreen} >
                    { received=== "light" ? "Mode Dark" : "Mode Light"}
                </Button>
            </Side>

        </Container>
    );
} 
NavBar.propTypes = {
    modeScreen: PropTypes.func.isRequired,
  };