import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Logo, Side, Theme } from './IndexStyle';

export const NavBar = ({modeScreen},received) => {
    return(
        <Container>
            
               <Link to="/">
                    <Logo>
                        Logo Logística
                    </Logo>
                </Link>   
            
            <Side>
                <Theme onClick={modeScreen} >
                    { received=== "light" ? "Mode Dark" : "Mode Light"}
                </Theme>
                <Link to="/login">
                    <Theme>
                        Login
                    </Theme>
                </Link>
                <Link to="/cadastro">
                    <Theme>
                        Cadastro
                    </Theme>
                </Link>
            </Side>

        </Container>
    );
}
NavBar.propTypes = {
    modeScreen: PropTypes.func.isRequired,
  };