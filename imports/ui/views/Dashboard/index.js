import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import dashboardStyle from "../../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import Sidebar from './Sidebar.js';
import Footer from './Footer.js';
import Header from './Header.js';

import DataLoader from './DataLoader.js';

import PropTypes from "prop-types";

import AppBar from '@material-ui/core/AppBar';

import QuerySelect from "../../components/Query/Select";
import SprintsSelect from "../../components/Sprints/Select";
import PointSwitch from "./PointsSwitch";

import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';

import RemainingPoints from './RemainingPoints/index.js';
import VelocityDays from './VelocityDays/index.js';
import VelocityWeeks from './VelocityWeeks/index.js';
import DaysToCompletion from './DaysToCompletion/index.js';
import TimeToCompletionAssignee from './TimeToCompletionAssignee/index.js';
import RepartitionByAssignee from './RepartitionByAssignee/index.js';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    logoText={"Agile App"}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Header
                        handleDrawerToggle={this.handleDrawerToggle}
                        pageName={"Dashboard"}
                    />
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <DataLoader/>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <div className={classes.appBar}>
                                        <QuerySelect />
                                        <SprintsSelect />
                                        <PointSwitch />
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={3}>
                                    <RemainingPoints/>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={3}>
                                    <VelocityDays/>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={3}>
                                    <VelocityWeeks/>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={3}>
                                    <DaysToCompletion/>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <TimeToCompletionAssignee/>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <RepartitionByAssignee/>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object,

};

const mapState = state => ({

});

const mapDispatch = dispatch => ({

});

export default connect(mapState, mapDispatch)(withRouter(withStyles(dashboardStyle)(Dashboard)));
