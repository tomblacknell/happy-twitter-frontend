import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

const Header = props => {

    function handleClick() {
        alert('onClick triggered on the title component');
    }

    const styles = {
        title: {
            cursor: 'pointer',
        },
    };

    return (
        <div>
            <AppBar
                title={<span style={styles.title}>HAPPY TWEETS</span>}
                onTitleClick={handleClick}
                iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                iconElementRight={<FlatButton label="Settings" href="/settings" />}
            />
        </div>
    );

};

export default Header;