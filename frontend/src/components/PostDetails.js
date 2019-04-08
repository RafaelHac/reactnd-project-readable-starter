import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaRegEdit,FaRegTrashAlt } from 'react-icons/fa';
import { formatDate } from '../utils/helpers';
import {Grid, Card, CardContent, Typography } from '@material-ui/core';
import { UP_VOTE, DOWN_VOTE } from '../actions/shared';
import { 
    handleReceivePosts, 
    handleDeletePost,
    handleDownVotePost, 
    handleUpVotePost, 
 } from '../actions/posts';
import CommentsList from './CommentsList';
import NewComment from './NewComment';

class PostDetails extends Component {
    componentDidMount(){
        if(!this.props.post){
            this.props.dispatch(handleReceivePosts(this.props.selectedCategory, this.props.sort));
        }
    }

    handleVote = (vote) => {
        const {post, dispatch } = this.props;
        switch(vote){
            case UP_VOTE:
                return dispatch(handleUpVotePost(post.id));
            case DOWN_VOTE:
                return dispatch(handleDownVotePost(post.id));
            default:
                return;
        }
    }

    handleDelete = () => {
        const {post, dispatch } = this.props;
        dispatch(handleDeletePost(post.id));
        this.props.history.push(`/`);
    }

    render() {
        const { post, selectedCategory } = this.props;
        if (post === null) {
            return (
                <div className="url-invalida">
                    <p>This Post doesn't exist!</p>
                </div>
            );
        }
        else if (post.category !== selectedCategory){
            return (
                <div className="url-invalida">
                    <p>This Post doesn't exist in this category!</p>
                </div>
            );
        }

        const {
            author, body, commentCount, id, category, timestamp, title, voteScore
        } = post;
        return (
            <Grid container spacing={24} style={{padding: 24} }>
                <Grid container spacing={24}  className='comments-list' direction='column' align='flex'>
                    <Card>
                        <CardContent>
                            <Grid container direction='line' >
                                <Grid container xs={2} direction='column'>
                                    <Grid item align='center'>
                                        <FaAngleUp className='up-vote-icon' onClick={() => this.handleVote(UP_VOTE)}/>
                                    </Grid>
                                    <Grid item align='center'>
                                        <span>{voteScore}</span>
                                    </Grid>
                                    <Grid item align='center'>
                                        <FaAngleDown className='down-vote-icon' onClick={() => this.handleVote(DOWN_VOTE)}/>
                                    </Grid>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="h5" component="h2">
                                            {title}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Posted by {author} in {formatDate(timestamp)} {commentCount !== 0 && (commentCount === 1 ? ` - ${commentCount} Comment` : ` - ${commentCount} Comments`)}
                                        </Typography>
                                        <Typography component="p">
                                            {body}
                                        </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Grid item align='center'>
                                        <FaRegTrashAlt className='delete-post' onClick = {() => this.handleDelete()}/>
                                    </Grid>
                                    <Grid item align='center'>
                                        <Link to={`/${selectedCategory}/${id}/edit`}>
                                            <FaRegEdit className='edit-post'/>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <CommentsList/>
                    <Grid item>
                        <NewComment postId={id}/>
                    </Grid>
                </Grid>
                
                
            </Grid>
            
        )
    }
}

function mapStateToProps ({posts, sort}, props) {
    const { id, category } = props.match.params;

    const post = Object.values(posts).filter((post) => post.id === id)[0];
  
    return {
        post: post
            ? post
            : null,
        selectedCategory: category,
        sort
    };
  };
  
export default withRouter(connect(mapStateToProps)(PostDetails));