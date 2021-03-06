import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class PullrequestsTabs extends Component {
    constructor (props) {
        super(props);
    }

    handleChange = (event, value) => {
        const { setSelectedTab } = this.props;
        setSelectedTab(value);
    };

    render() {
        const { selectedTab } = this.props;
        return (
            <Tabs
                value={selectedTab}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="Summary" />
                <Tab label="List" />
            </Tabs>
        );
    }
}

PullrequestsTabs.propTypes = {
    selectedTab: PropTypes.number.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
};

const mapState = state => ({
    selectedTab: state.pullrequestsView.selectedTab,
});

const mapDispatch = dispatch => ({
    setSelectedTab: dispatch.pullrequestsView.setSelectedTab,
});

export default connect(mapState, mapDispatch)(PullrequestsTabs);
