import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

import PropTypes from "prop-types";

import CustomCard from "../../../components/CustomCard/index.js";

import ReposTreemap from './ReposTreemap.js';

const styles = theme => ({
    root: {
    }
});

class RemainingPoints extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, assignees, issues } = this.props;

        const openPoints = issues
            .filter(issue => issue.state === 'OPEN')
            .map(issue => issue.points)
            .reduce((acc, points) => acc + points, 0);

        const repartitionAssignees = assignees.map((assignee) => {
            return {
                ...assignee,
                open: {
                    points: assignee.issues.list.filter(issue => issue.state === 'OPEN').map(issue => issue.points).reduce((acc, points) => acc + points, 0),
                    issues: assignee.issues.list.filter(issue => issue.state === 'OPEN').length,
                },
                closed: {
                    points: assignee.issues.list.filter(issue => issue.state === 'CLOSED').map(issue => issue.points).reduce((acc, points) => acc + points, 0),
                    issues: assignee.issues.list.filter(issue => issue.state === 'CLOSED').length,
                },
            }
        });
        return (
            <CustomCard
                headerTitle="Remaining"
                headerFactTitle="Remaining work"
                headerFactValue={openPoints + " Pts"}
            >
                <ReposTreemap
                    assignees={repartitionAssignees}
                />
            </CustomCard>
        );
    }
}

RemainingPoints.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(RemainingPoints);