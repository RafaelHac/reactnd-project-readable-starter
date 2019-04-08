import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaRegTrashAlt } from 'react-icons/fa';
import { formatDate } from '../utils/helpers';
import { UP_VOTE, DOWN_VOTE } from '../actions/shared';
import { handleDeletePost, handleDownVotePost, handleUpVotePost } from '../actions/posts';
import { Grid, Card, CardContent, CardActionArea, CardActions, Button, Typography, withStyles } from '@material-ui/core';
import {styles} from '../utils/theme';

class Post extends Component {
    handleVote = (vote) => {
        const { id, dispatch, sort } = this.props;
        switch(vote){
            case UP_VOTE:
                return dispatch(handleUpVotePost(id, sort));
            case DOWN_VOTE:
                return dispatch(handleDownVotePost(id, sort));
            default:
                return;
        }
    }

    handleDelete = () => {
        const {post, dispatch, classes } = this.props;
        console.log(this.props);
        dispatch(handleDeletePost(post.id));
    }

    render() {
        const { post, classes } = this.props
        if (post === null) {
            return <p>This Post doesn't exist</p>
        }

        const {
            author, body, category, commentCount, id, timestamp, title, voteScore
        } = post

        return (
                <Card>
                    <CardContent>
                        <Grid container direction='line'>
                            <Grid container xs={2} direction='column' align='stretch'>
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
                            <Grid item xs={8} component={NavLink} to={`/${category}/${id}`}>
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
                                <div className='post-delete'>
                                    <FaRegTrashAlt className='delete-post' onClick = {() => this.handleDelete()}/>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            
        )
    }
}

function mapStateToProps ({posts, sort}, { id }) {
    const post = Object.values(posts).filter((post) => post.id === id)[0];
  
    return {
        post: post
            ? post
            : null,
        sort
    }
  }
  
export default withRouter(connect(mapStateToProps)(Post));