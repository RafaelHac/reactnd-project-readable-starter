import React from 'react';
import { NavLink } from 'react-router-dom';
import {amber} from '@material-ui/core/colors'
import { AppBar, Typography, Toolbar, Button} from '@material-ui/core';

export default function Nav () {
  return (
      <AppBar position='static'>
        <Toolbar>
          <Button component={NavLink} to='/'>
            <Typography variant="h6" color="inherit">Home</Typography>
          </Button>
          <Button component={NavLink} to='/new'>
            <Typography variant="h6" color="inherit">Add New Post</Typography>
          </Button>
        </Toolbar>
      </AppBar>
  );
}