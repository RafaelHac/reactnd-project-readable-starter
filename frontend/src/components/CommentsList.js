import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Comment from './Comment';
import EditComment from './EditComment'
import { handleReceiveComments } from '../actions/comments';
import { selectCategory } from '../actions/selectedCategory';
import { Grid, Typography } from '@material-ui/core';

class CommentsList extends Component{
    
    componentDidMount(){
        const { dispatch, postId, selectedCategory } = this.props;
        dispatch(selectCategory(selectedCategory));
        dispatch(handleReceiveComments(postId));
    }

    render(){
        const { comments, commentId } = this.props;
        return(
            <Grid container spacing={24} style={{padding: 24}}>
                <Grid item xs={12} md={10}>
                        <Typography variant='h6' color='inherit' align='center'>
                            {(comments && comments.length > 0) ? `COMMENTS (${comments.length})` : `NO COMMENTS`}
                        </Typography>
                    </Grid>
                <Grid container spacing={24}  className='comments-list' direction='column' align='flex'>
                    {comments !== undefined && 
                        comments.filter((comment) => (comment.deleted === false && comment.parentDeleted === false))
                            .map((comment) => (
                                <Grid item key={comment.id}>
                                    {(commentId !== undefined && comment.id === commentId)
                                        ? <EditComment id={comment.id}/>
                                        : <Comment id={comment.id}/>
                                    }
                                </Grid>
                            ))}
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps( {comments}, props ){
    const {id, commentId}  = props.match.params;

    return {
        comments: Object.values(comments),
        selectedCategory: props.match.params.category,
        postId: id,
        commentId
    };
}

export default withRouter(connect(mapStateToProps)(CommentsList));