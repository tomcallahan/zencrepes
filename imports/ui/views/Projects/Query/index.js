import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

import Grid from '@material-ui/core/Grid';

import Clear from './Clear.js';
import MongoFilter from './MongoFilter.js';
import Filters from './Filters/index.js';

import { addRemoveFromQuery } from "../../../utils/query/index.js";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    root: {
        margin: '10px',
        border: `1px solid ${theme.palette.divider}`,
    },
    query: {
        flex: 1,
    },
});


class ProjectsQuery extends Component {
    constructor (props) {
        super(props);
        this.state = {
            openSaveQueryDialog: false,
            openManageQueryDialog: false,
        }
    }

    clearQuery = () => {
        this.props.history.push({
            pathname: '/projects',
            search: '?q={}',
            state: { detail: '{}' }
        });
    };

    loadQuery = (query) => {
        this.props.history.push({
            pathname: '/projects',
            search: '?q=' + query.filters,
            state: { detail: query.filters }
        });
        this.setState({ openManageQueryDialog: false });
    };

    updateQuery = (valueName, facet) => {
        const { query } = this.props;
        const modifiedQuery = addRemoveFromQuery(valueName, facet, query);
        this.props.history.push({
            pathname: '/projects',
            search: '?q=' + JSON.stringify(modifiedQuery),
            state: { detail: modifiedQuery }
        });
    };

    setOpenSaveQueryDialog = (state) => {
        this.setState({ openSaveQueryDialog: state });
    };

    openSaveQueryDialog = () => {
        this.setState({ openSaveQueryDialog: true });
    };

    closeSaveQueryDialog = () => {
        this.setState({ openSaveQueryDialog: false });
    };

    setOpenManageQueryDialog = (state) => {
        this.setState({ openManageQueryDialog: state });
    };

    openManageQueryDialog = () => {
        this.setState({ openManageQueryDialog: true });
    };

    closeManageQueryDialog = () => {
        this.setState({ openManageQueryDialog: false });
    };

    render() {
        const { classes, query, facets } = this.props;

        return (
            <div className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={8}
                >
                    <Grid item xs={12} sm container>
                        <Filters
                            query={query}
                            facets={facets}
                            updateQuery={this.updateQuery}
                        />
                    </Grid>
                    <Grid item >
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                            spacing={0}
                        >
                            <Grid item >
                                <Clear onClick={this.clearQuery}/>
                            </Grid>
                            <Grid item >
                                <MongoFilter query={query}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ProjectsQuery.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    facets: PropTypes.array.isRequired,
};

const mapState = state => ({
    query: state.projectsView.query,
    facets: state.projectsView.facets,
});

export default withRouter(connect(mapState, null)(withStyles(styles)(ProjectsQuery)));

