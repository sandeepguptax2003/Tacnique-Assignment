import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, People, Assessment, Help } from '@mui/icons-material';

const drawerWidth = 240;

function Sidebar({ open }) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {[
          { text: 'Dashboard', icon: <Dashboard /> },
          { text: 'User Management', icon: <People /> },
          { text: 'Reports', icon: <Assessment /> },
          { text: 'Support', icon: <Help /> },
        ].map((item, index) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;