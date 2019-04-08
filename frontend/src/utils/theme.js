import { createMuiTheme } from '@material-ui/core/styles';
import { amber, orange } from '@material-ui/core/colors';;

export default createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: amber,
        secondary: orange
    },
    menuItem: {
        '&:focus': {
          backgroundColor: amber,
          '& $primary, & $icon': {
            color: amber[100],
          },
        },
      },
    
});


export const styles = theme => ({
    menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
    },
    primary: {},
    icon: {},
  });
  