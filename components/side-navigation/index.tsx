import { Toolbar, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ListAlt, Task } from '@mui/icons-material';
import React from 'react'

/* Prop Types */
export interface Props {
  /**
   * The toggle boolean to open/close the drawer
   **/
  open: boolean
  /**
   * The dispatch function to switch the view
   **/
  dispatch: (action: any) => void
  /**
   * The toggle function to open/close the drawer
   */
  toggleDrawer: () => void
  /**
   * How wide should the drawer be?
   */
  drawerWidth: number
}

/* Render component */
export const SideNavigation: React.FC<Props> = ({ open, dispatch, toggleDrawer, drawerWidth }: Props) => {


  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  return <Drawer variant="permanent" open={open}>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
      >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
    </Toolbar>
    <Divider />
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={(e) => dispatch('VIEW')}>
          <ListItemIcon>
            <ListAlt />
          </ListItemIcon>
          <ListItemText primary="View chores list" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={(e) => dispatch('ADD')}>
          <ListItemIcon>
            <Task />
          </ListItemIcon>
          <ListItemText primary="Add new chore  " />
        </ListItemButton>
      </ListItem>
    </List>
  </Drawer>
}

export default SideNavigation