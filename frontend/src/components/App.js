import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

import LoadingBar from 'react-redux-loading';
import Nav from './Nav';
import CategoryList from './CategoryList';
import PostsList from './PostsList';
import PostDetails from './PostDetails';
import NewPost from './NewPost';
import EditPost from './EditPost';

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
//import amber from '@material-ui/core/amber';

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
          <CssBaseline />
          <div className="Container">
            
            {this.props.loading === true
                ? null
                : <Fragment>
                    <Grid container>
                      <Grid item xs={12}><Nav/></Grid>
                      <Grid item xs={8} sm={8}>
                        <div>
                          <Switch>
                            <Route path='/' exact component={PostsList} />
                            <Route path='/new' exact component={NewPost} />
                            <Route path='/:category' exact component={PostsList} />
                            <Route path='/:category/:id' exact component={PostDetails}/>
                            <Route path='/:category/:id/edit' exact component={EditPost}/>
                            <Route path='/:category/:id/:commentId' exact component={PostDetails}/>
                          </Switch>
                        </div>
                      </Grid>
                      <Grid item xs={4} sm={4}><CategoryList/></Grid>
                    </Grid>
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
