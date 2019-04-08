import React, { Component } from 'react';
import { connect } from 'react-redux';
import {PostForm, validationSchema} from './PostForm';
import { Formik, Field, ErrorMessage } from 'formik';
import { handleAddPost } from '../actions/posts'

class NewPost extends Component {  
    handleSubmit = (values, { setSubmitting }) => {
        const {title, author, category, body} = values;
        setTimeout(() => {
            this.props.dispatch(handleAddPost({title,author,category,body}))
                .then((post) => {
                    setSubmitting(false);
                    this.props.history.push(`/${post.category}/${post.id}`);
                });
        }, 400)
        
    };
        

    render() {
        const { categories } = this.props;
        return (
            <div>
                <Formik 
                    onSubmit={this.handleSubmit}
                    render={props => <PostForm {...props} categories={categories}/>}
                    initialValues={{author:'', body:'', category:'', title:''}}
                    validationSchema={validationSchema}
                />
            </div>
        )
    }
}

function mapStateToProps ({categories, sort}) {
    return {
        categories: Object.values(categories),
        sort
    }
  }
  
export default connect(mapStateToProps)(NewPost);