import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { styles } from '../utils/theme';
import { MenuList, MenuItem, ListItemText, withStyles } from '@material-ui/core';

class CategoryList extends Component{
    render(){
        const {categories, classes} = this.props;
        return(
            <MenuList>
                Categories
                    {categories !== undefined && categories.map((category) => (
                        <MenuItem className={classes.menuItem} component={NavLink} to={`/${category.path}`} key={category.path}>
                            <ListItemText classes={{ primary: classes.primary }} inset primary={category.name} />
                        </MenuItem>
                    ))}
            </MenuList>
        )
    }
}

function mapStateToProps({ categories }){
    return {
        categories: Object.values(categories)
    };
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(CategoryList)));