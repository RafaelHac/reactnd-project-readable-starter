import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

import LoadingBar from 'react-redux-loading';
import Nav from './Nav';
import CategoryList from './CategoryList';
import PostsList from './PostsList';
import PostDetails from './PostDetails';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    console.log(this.props.loading);
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="Container">
            
            {this.props.loading === true
                ? null
                : <Fragment>
                    <Nav/>
                    <CategoryList/>
                    <div>
                      <Route path='/' exact component={PostsList} />
                      <Route path='/:category' exact component={PostsList} />
                      <Route path='/:category/post/:id' exact component={PostDetails}/>
                    </div>
                  </Fragment>}
                
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ categories, posts, categorySelected }) {
  return {
    loading: Object.entries(categories).length === 0 && Object.entries(posts).length === 0,
    categorySelected
  }
}

export default connect(mapStateToProps)(App);
