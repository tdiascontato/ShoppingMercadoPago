import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Logo, Side, Button } from './IndexStyle';

export const NavBar = ({modeScreen},received) => {
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem("loggedIn"));
    useEffect(() => {
        // Atualiza o valor de isLoggedIn com o valor no localStorage quando o componente for montado.
        setIsLoggedIn(window.localStorage.getItem("loggedIn"));
      }, []);
    return(
        <Container>
            
               <Link to="/">
                    <Logo>
                        Logo Logística
                    </Logo>
                </Link>   
            
            <Side>
                <Button onClick={modeScreen} >
                    { received=== "light" ? "Mode Dark" : "Mode Light"}
                </Button>
                <Link to="/login">
                    <Button>
                        {isLoggedIn ? "Dashboard" : "Login"}
                    </Button>
                </Link>
                <Link to="/cadastro">
                    <Button>
                        Cadastro
                    </Button>
                </Link>
            </Side>

        </Container>
    );
}
NavBar.propTypes = {
    modeScreen: PropTypes.func.isRequired,
  };