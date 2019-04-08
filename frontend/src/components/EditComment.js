import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { handleEditComment } from '../actions/comments'
import { CommentForm, validationSchema } from '../components/CommentForm';
import { Card,CardContent } from '@material-ui/core';

class EditComment extends Component {  
    componentDidMount(){
        
    }

    handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
            const {dispatch, comment, selectedCategory} = this.props;
            const {body} = values
            dispatch(handleEditComment(comment.id, body, comment.parentId))
                .then((comment) => {
                    setSubmitting(false);
                    this.props.history.push(`/${selectedCategory}/${comment.parentId}`);
                });
        }, 400)
        
    };
        
    render() {
        const {comment} = this.props
        console.log('edit ',this.props);
        return (
            <Card>
                <CardContent>
                    <Formik 
                        onSubmit={this.handleSubmit}
                        render={props => <CommentForm {...props} edit={true}/>}
                        initialValues={{author:comment.author, body:comment.body}}
                        validationSchema={validationSchema}
                    />
                </CardContent>
            </Card>
        )
    }
}

function mapStateToProps ({comments, selectedCategory}, {id}) {
    const comment = Object.values(comments).filter((comment) => comment.id === id)[0];
    return {
      comment: comment
        ? comment
        : null,
      selectedCategory
    }
  }
  
export default withRouter(connect(mapStateToProps)(EditComment));