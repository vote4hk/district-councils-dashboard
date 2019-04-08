import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 320;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

const SideBar = (props) => {
  const { style, drawerPaper, dcca } = props

  
  const dc2019 = dcca !== undefined &&  dcca.dccaList !== undefined ? dcca.dccaList.find(d => d.name.includes('2019')) : null
  
  return (
    <Drawer
      className={style}
      variant="permanent"
      anchor="left"
      classes={{
        paper: drawerPaper,
      }}
    >
    {dc2019 && dc2019.features.map(feature => 
    <ListItem key={feature.properties.CACODE} href="#">
    <ListItemText primary={`${feature.properties.CACODE} - ${feature.properties.CNAME}`} />
  </ListItem>
    )}
    </Drawer>
  )
}

export default withStyles(styles)(SideBar)