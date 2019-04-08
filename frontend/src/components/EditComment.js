import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { handleEditComment } from '../actions/comments'

class EditComment extends Component {  
    componentDidMount(){
        
    }

    handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
            const {dispatch, comment, selectedCategory} = this.props;
            const {body} = values.comment
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
            <div>
                {this.props.loading === true
                ? null
                : <div>
                    {comment.author}
                    <Formik
                        initialValues={{
                            comment:{
                                body:comment.body,
                            }
                        }}
                        validation={values => {
                            let errors = {};
                            if(!values.comment.body){
                                errors.comment.body = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={this.handleSubmit}
                    >
                            {({ isSubmitting }) => (
                                <Form>
                                    <Field type='textArea' name='comment.body' placeholder='Write your comment here!'/>
                                    <ErrorMessage name='comment.body' component='div' />
                                    <button type='submit' disabled={isSubmitting}>
                                        Edit
                                    </button>
                                </Form>
                            )}
                    </Formik>
                </div>}
            </div>
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