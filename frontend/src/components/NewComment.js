import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { handleAddComment } from '../actions/comments'

class NewComment extends Component {  
    handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log(values);
        setTimeout(() => {
            this.props.dispatch(handleAddComment(values.comment, this.props.postId))
                .then((comment) => {
                    setSubmitting(false);
                    resetForm();
                });
        }, 400)
        
    };
        

    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        comment:{
                            author: '',
                            body:'',
                        }
                    }}
                    validation={values => {
                        let errors = {};
                        if(values.comment.author === ''){
                            errors.comment.author = 'Required';
                        }
                        if(!values.comment.body){
                            errors.comment.body = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={this.handleSubmit}
                >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field type='text' name='comment.author' placeholder='Name' label='Author'/>
                                <ErrorMessage name='comment.author' component='div' />
                                <Field type='textArea' name='comment.body' placeholder='Write your comment here!'/>
                                <ErrorMessage name='comment.body' component='div' />
                                <button type='submit' disabled={isSubmitting}>
                                    Add New Comment
                                </button>
                            </Form>
                        )}
                    </Formik>
            </div>
        )
    }
}
  
export default connect()(NewComment);