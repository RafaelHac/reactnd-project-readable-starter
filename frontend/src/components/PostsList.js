import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleReceivePosts } from '../actions/posts';
import { Grid, Typography, GridCell, Card, Paper } from '@material-ui/core';
import Post from './Post';
import Sorting from './Sorting';

class PostsList extends Component{
    componentDidMount(){
        const {categorySelected, handleCategorySelection, sort} = this.props;
        handleCategorySelection(categorySelected, sort);
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.categorySelected !== this.props.categorySelected){
            const {categorySelected, handleCategorySelection, sort} = this.props;
            handleCategorySelection(categorySelected, sort);
        }
    }
    
    render(){
        const {categorySelected, posts} = this.props;
        
        return(
            <div>
                <Grid container spacing={24} style={{padding: 24}}>
                    <Grid item xs={12} md={10}>
                        <Typography variant='h6' color='inherit' align='center'>
                            {categorySelected  ? categorySelected.toUpperCase() : 'POSTS'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={2}><Sorting/></Grid>
                    <Grid container spacing={24}  className='post-list' direction='column' align='flex'>
                        {posts !== undefined && 
                            posts.filter((post) => post.deleted === false)
                                .map((post) => (
                                    <Grid item key={post.id}>
                                            <Post id={post.id}/>
                                    </Grid>
                                ))}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps({ posts, sort }, props){
    const categorySelected = props.match.params.category;
    return {
        categorySelected,
        posts: Object.values(posts),
        sort
    };
}

function mapDispatchToProps (dispatch) {
    return{
        handleCategorySelection: (categorySelected, sort) => {
            return dispatch(handleReceivePosts(categorySelected, sort));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);