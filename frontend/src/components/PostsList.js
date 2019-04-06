import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleReceivePosts } from '../actions/posts';
import Post from './Post';

class PostsList extends Component{
    componentDidMount(){
        const {categorySelected, handleCategorySelection} = this.props;
        handleCategorySelection(categorySelected);
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.categorySelected !== this.props.categorySelected){
            const {categorySelected, handleCategorySelection} = this.props;
            handleCategorySelection(categorySelected);
        }
    }
    
    render(){
        const {categorySelected, posts} = this.props;
        
        return(
            <div>
                {categorySelected  ? categorySelected.toUpperCase() : 'POSTS'}
                <ul className='post-list'>
                    
                    {posts !== undefined && 
                        posts.filter((post) => post.deleted === false)
                            .map((post) => (
                                <li key={post.id}>
                                    <Post id={post.id}/>
                                </li>
                            ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ posts }, props){
    const categorySelected = props.match.params.category;
    return {
        categorySelected,
        posts: Object.values(posts)
    };
}

function mapDispatchToProps (dispatch) {
    return{
        handleCategorySelection: (categorySelected) => {
            return dispatch(handleReceivePosts(categorySelected));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);