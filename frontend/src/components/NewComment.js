import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { handleAddComment } from '../actions/comments';
import { CommentForm, validationSchema } from '../components/CommentForm';
import { Card,CardContent } from '@material-ui/core';

class NewComment extends Component {  
    handleSubmit = (values, { setSubmitting, resetForm }) => {
        const {body,author} = values;
        setTimeout(() => {
            this.props.dispatch(handleAddComment({body,author}, this.props.postId))
                .then((comment) => {
                    setSubmitting(false);
                    resetForm();
                });
        }, 400)
        
    };
        

    render() {
        return (
            <Card>
                <CardContent>
                    <Formik 
                        onSubmit={this.handleSubmit}
                        render={props => <CommentForm {...props}/>}
                        initialValues={{author:'', body:''}}
                        validationSchema={validationSchema}
                    />
                </CardContent>
            </Card>
        )
    }
}
  
export default connect()(NewComment);