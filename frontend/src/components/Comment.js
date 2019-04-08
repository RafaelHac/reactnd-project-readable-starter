import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { formatDate } from '../utils/helpers';
import { UP_VOTE, DOWN_VOTE } from '../actions/shared';
import { handleDeleteComment, handleDownVoteComment, handleUpVoteComment } from '../actions/comments';
import { Grid, Card ,CardContent, Typography } from '@material-ui/core';

class Comment extends Component {
    handleDelete = () => {
        const {comment, dispatch } = this.props;
        dispatch(handleDeleteComment(comment.id));
    }
    
    handleVote = (vote) => {
        const {id, dispatch } = this.props;
        switch(vote){
            case UP_VOTE:
                return dispatch(handleUpVoteComment(id));
            case DOWN_VOTE:
                return dispatch(handleDownVoteComment(id));
            default:
                return;
        }
    }

    render() {
        const { comment, selectedCategory } = this.props
        if (comment === null) {
            return <p>This Comment doesn't exist</p>
        }

        const {
            id, author, body, timestamp, voteScore, parentId
        } = comment

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
                        <Grid item xs={8}>
                            <Typography component="p">
                                    {body}
                            </Typography>
                            <Typography color="textSecondary">
                                Posted by {author} in {formatDate(timestamp)}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid item align='center'>
                                <FaRegTrashAlt className='delete-post' onClick = {() => this.handleDelete()}/>
                            </Grid>
                            <Grid item align='center'>
                                <Link to={`/${selectedCategory}/${parentId}/${id}`}>
                                    <FaRegEdit className='edit-post'/>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
                    
           
        )
    }
}

function mapStateToProps ({comments, selectedCategory}, {id}, props) {
    const comment = Object.values(comments).filter((comment) => comment.id === id)[0];
    return {
      comment: comment
        ? comment
        : null,
      selectedCategory
    }
  }
  
export default withRouter(connect(mapStateToProps)(Comment))