import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { 
    sortPosts,
    BY_DATE,
    BY_VOTE_SCORE,
 } from '../actions/posts';
 import { Grid, Select, MenuItem } from '@material-ui/core';

class Sorting extends Component {
    state = {
        by: BY_VOTE_SCORE,
        asc: false
    }
    
    handleDirection = () => {
        const sorting = this.state;
        sorting.asc = !sorting.asc;
        this.props.dispatch(sortPosts(sorting));
        this.setState(sorting);
    }

    handleSortBy = (e) => {
        const sorting = this.state;
        sorting.by = e.target.value;
        this.props.dispatch(sortPosts(sorting));
        this.setState(sorting);
    }

    render() {
        const {
            by, asc
        } = this.state;

        return (
            <Grid container>
                <Grid item className='sort-by'>
                    <Select value={by} onChange={this.handleSortBy}>
                        <MenuItem value={BY_DATE}>by Date</MenuItem>
                        <MenuItem value={BY_VOTE_SCORE}>by Score</MenuItem>
                    </Select>
                </Grid>  
                <Grid item className='sort-direction'>
                    {asc 
                        ? <FaSortUp className='sort-direction' paddingsize={20} onClick={() => this.handleDirection() }/>
                        : <FaSortDown className='sort-direction' size={20} onClick={() => this.handleDirection()}/>
                    }
                </Grid>
            </Grid>
        )
    }
}

export default connect()(Sorting)