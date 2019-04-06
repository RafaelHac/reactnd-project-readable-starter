import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'

class CategoryList extends Component{
    render(){
        const {categories} = this.props;
        //console.log(categories)
        return(
            <nav>
                Categories
                <ul className='category-list'>
                    {categories !== undefined && categories.map((category) => (
                        <li key={category.path}>
                            <NavLink to={`/${category.path}`} className='tweet'>{category.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ categories }){
    return {
        categories: Object.values(categories)
    };
}

export default withRouter(connect(mapStateToProps)(CategoryList));