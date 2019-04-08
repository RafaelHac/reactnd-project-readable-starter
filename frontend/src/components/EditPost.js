import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { handleEditPost, handleReceivePosts } from '../actions/posts';
import {PostForm, validationSchema} from './PostForm';

class EditPost extends Component {  
    componentDidMount(){
        if(!this.props.post){
            this.props.dispatch(handleReceivePosts());
        }
    }
    
    handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            const { dispatch, post } = this.props;
            const { title, body } = values;

            dispatch(handleEditPost(post.id, title, body, post.category))
                .then((post) => {
                    setSubmitting(false);
                    this.props.history.push(`/${post.category}/${post.id}`);
                });
        }, 400)
        
    };
        

    render() {
        const { post, categoryPath, categories } = this.props;

        if (post === null) {
            return (
                <div className="url-invalida">
                    <p>This Post doesn't exist!</p>
                </div>
            );
        }
        else if (post.category !== categoryPath){
            return (
                <div className="url-invalida">
                    <p>This Post doesn't exist in this category!</p>
                </div>
            );
        }

        return (
            <div>
                <Formik 
                    onSubmit={this.handleSubmit}
                    render={props => <PostForm {...props} categories={categories} edit={true}/>}
                    initialValues={{author:post.author, body:post.body, category:post.category, title:post.title}}
                    validationSchema={validationSchema}
                />
            </div>
        )
    }
}

function mapStateToProps ({posts, categories}, props) {
    const { id, category } = props.match.params;

    const post = Object.values(posts).filter((post) => post.id === id)[0];
    
    return {
      post: post ? post : null,
      categories,
      categoryPath: category,
      loading: !post
    }
  }
  
export default withRouter(connect(mapStateToProps)(EditPost));