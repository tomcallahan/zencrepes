import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withApollo } from 'react-apollo';
import { connect } from "react-redux";

import AppMenu from '../../components/AppMenu/index.js';
import LeftDrawer from '../../components/LeftDrawer/index.js'

import { cfgSources } from '../../data/Minimongo.js';

import SyncFilters from './SyncFilters.js';

import NoRepos from '../../components/Dialogs/NoRepos.js';

import Issues, { cfgIssues } from '../../data/Minimongo.js';
import Grid from 'material-ui/Grid';
import Facets from '../../components/Facets/index.js';
import QueryView from '../../components/Query/View/index.js';
import IssuesTable from '../../components/Table/index.js';
import GitRequests from '../../components/Github/GitRequests.js';
import LoadingIssues from '../../components/Loading/Issues/index.js';

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        paddingTop: 80,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
});

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {sourcesInit: false};
    }

    componentDidMount() {
        console.log('Search: componentDidMount');
        this.loadIssues();
    }

    loadIssues() {
        console.log('Search: loadIssues : ' + cfgIssues.find({}).count());
        const { setLoadIssues } = this.props;
        if (cfgIssues.find({}).count() === 0) {
            setLoadIssues(true);
        }
    }

    componentDidUpdate() {
        console.log('Search: componentDidUpdate');
        this.loadIssues();
    }

    render() {
        const { classes } = this.props;
        if (cfgSources.find({'active': true}).count() > 0 ) {
            return (
                <div className={classes.root}>
                    <LoadingIssues />
                    <SyncFilters />
                    <AppMenu />
                    <main className={classes.content}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <QueryView />
                            </Grid>
                            <Grid item xs={4}>
                                <Facets />
                            </Grid>
                            <Grid item xs={8}>
                                <IssuesTable />
                            </Grid>
                            <Grid item xs={12}>
                                <GitRequests />
                            </Grid>
                        </Grid>
                    </main>
                </div>
            );
        } else {
            return (
                <div className={classes.root}>
                    <AppMenu />
                    <main className={classes.content}>
                        <NoRepos />
                    </main>
                </div>
            );
        }
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    rateLimit: PropTypes.object,
};

const mapState = state => ({
//    loadIssues: state.github.loadIssues,
});

const mapDispatch = dispatch => ({
    setLoadIssues: dispatch.github.setLoadIssues,
});

export default connect(mapState, mapDispatch)(withStyles(styles)(withApollo(Search)));