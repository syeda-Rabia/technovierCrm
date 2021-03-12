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
      //    Admin Sidebar
      //   </ListSubheader>
      // }
      className={classes.root}
    >
      <ListItem>
        
        <ListItemLink href="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="DashBoard"/>
        </ListItemLink>
      </ListItem>
      <ListItem  onClick={handleClick}>
      <ListItemLink href="#">
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary="Leads" />
        
        </ListItemLink>{open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List style={{paddingLeft:"18px"}}>
          <ListItem  className={classes.nested}>
           
            <ListItemLink href="/admin/leads">
           <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Leads Lists" />
            </ListItemLink>
          </ListItem>
          <ListItem  className={classes.nested}>
          <ListItemLink href="/admin/integrated-leads">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Integrated leads" />
            </ListItemLink>
          </ListItem>
          <ListItem className={classes.nested}>
          <ListItemLink href="/admin/closedleads">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Closed Leads" />
            </ListItemLink>
          </ListItem>
        </List>
      </Collapse>
      <ListItem >
       
          <ListItemLink href="/admin/leadsallocation">
          <ListItemIcon>
          <FilterListIcon />
        </ListItemIcon>
        <ListItemText primary="Leads Allocation"/>
          </ListItemLink>
      </ListItem>
      {/* <ListItem >

      <ListItemLink href="/admin/todolist">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="To Do List"/>
        </ListItemLink>
      </ListItem> */}
      <ListItem  onClick={handleClick2}>
      
      <ListItemLink href="#">
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        
        <ListItemText primary="Inventory  " />
       
        </ListItemLink> {inventoryList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={inventoryList} timeout="auto" unmountOnExit>
        <List style={{paddingLeft:"18px"}}  >
        <ListItem  className={classes.nested}>
           
             <ListItemLink href="/admin/inventory">
             <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory List"/>
             </ListItemLink>
          </ListItem>
          <ListItem  className={classes.nested}>
           
            <ListItemLink href="/admin/viewable">
 <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Viewable" />
            </ListItemLink>
          </ListItem>
          <ListItem  className={classes.nested}>
            
             <ListItemLink href="/admin/employee-request">
             <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory Requests"/>
             </ListItemLink>
          </ListItem> 
        </List>
      </Collapse> 
      <ListItem>
       
        <ListItemLink href="/admin/user">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users"/>
        </ListItemLink>
      </ListItem>
      <ListItem >
       
       <ListItemLink href="/admin/notifications">
       <ListItemIcon>
       <Badge badgeContent={2} color="error">
         <NotificationsIcon />
         </Badge>
       </ListItemIcon>
       <ListItemText primary="Notification"/>
       </ListItemLink>
     </ListItem>
      <ListItem >
        
        <ListItemLink href="/admin/policies">
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Policies"/>
        </ListItemLink>
      </ListItem>
      <ListItem >
     
        <ListItemLink href="/admin/documentation">
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Documentation"/>
        </ListItemLink>
      </ListItem>
      <ListItem >
       
        <ListItemLink href="/admin/settings">
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
