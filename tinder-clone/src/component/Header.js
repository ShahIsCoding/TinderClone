import React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import { Link ,useHistory} from 'react-router-dom';

function Header({backButton}) {
    const history = useHistory();
    console.log(history);
    
    return (
        <div className='header'>
            {backButton ? (
                <IconButton onClick={() => history.replace(backButton)}>
                <ArrowBackIosIcon className="header__icon" fontSize="large" />
                </IconButton>
            ) : (
                <Link to='/users'>
                    <IconButton>
                    <PersonIcon className="header__icon" fontSize="large" />
                    </IconButton>   
                </Link>

            )}
            <Link to='/'>
                <img 
                    className='header__logo'
                    src='https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/tinder.png'
                    alt='tinder__logo'
                />
            </Link>    
            <Link to='/chat'>
                <IconButton>
                    <ForumIcon fontSize='large' className='header__icon'/>
                </IconButton>           
            </Link>

        </div>
    );
}

export default Header
