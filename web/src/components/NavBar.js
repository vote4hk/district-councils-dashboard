import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class NavBar extends React.Component {
    render() {
        const { style } = this.props
        return (
            <div>
                <AppBar position="fixed" className={style}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            District Councils Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default NavBar