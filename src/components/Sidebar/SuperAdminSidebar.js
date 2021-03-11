import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'; 
import ViewListIcon from '@material-ui/icons/ViewList';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FilterListIcon from '@material-ui/icons/FilterList';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TocIcon from '@material-ui/icons/Toc';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [inventoryList, setInventoryList] = React.useState(false);


  const handleClick = () => {
    setOpen(!open);
    
  };
  
  const handleClick2 = () => {
  
    setInventoryList(!inventoryList);
  };
  
  return (
    <List style={{paddingLeft:"0px !important"}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //   Super Admin Sidebar
      //   </ListSubheader>
      // }
      className={classes.root}
    >
      <ListItem  button>
        
        <ListItemLink href="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="DashBoard"/>
        </ListItemLink>
      </ListItem>
     
       <ListItem button>
        
        <ListItemLink href="/superadmin/client">
        <ListItemIcon>
        <GroupIcon/>
        </ListItemIcon>
        <ListItemText primary="Clients"/>
        </ListItemLink>
      </ListItem>
      <ListItem button>

      <ListItemLink href="/superadmin/package-management">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Package Management"/>
        </ListItemLink>
      </ListItem>
      <ListItem button>
       
       <ListItemLink href="/superadmin/fianance-management">
       <ListItemIcon>
         <AccountBalanceIcon />
       </ListItemIcon>
       <ListItemText primary="Fianance Management"/>
       </ListItemLink>
     </ListItem>
      <ListItem button>
       
       <ListItemLink href="/superadmin/notification">
       <ListItemIcon>
       <Badge badgeContent={2} color="error">
         <NotificationsIcon />
         </Badge>
       </ListItemIcon>
       <ListItemText primary="Notifications"/>
       </ListItemLink>
     </ListItem>
     
      <ListItem button>
     
        <ListItemLink href="/superadmin/documentation">
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Documentation"/>
        </ListItemLink>
      </ListItem>
      <ListItem button>
       
        <ListItemLink href="/superadmin/setting">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings"/>
        </ListItemLink>
      </ListItem>
      {/* <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse> */}
    </List>
  );
}
