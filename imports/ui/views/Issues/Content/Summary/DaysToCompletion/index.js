import React, { Component } from 'react';

import PropTypes from 'prop-types';

import CustomCard from "../../../../../components/CustomCard/index.js";
import VelocityBarHorizontal from "./VelocityBarHorizontal.js";

class DaysToCompletion extends Component {
    constructor (props) {
        super(props);
    }

    /*
    TODO - Make it better, very very badly coded
    Find effortCountDays closest to current date
    */
    getTimeToCompletion(dataset) {
        const { defaultPoints } = this.props;
        let metric = 'points';
        if (!defaultPoints) {metric = 'issues';}

        let effort = 0;
        if (dataset !== undefined ) {
            let filteredValues = dataset.filter(v => v.completion[metric].effort !== undefined)

            let rangeValues = [];
            effort = filteredValues.find(v => v.range === '4w');
            if (effort !== undefined) {
                if (effort.completion[metric].effort !== undefined && effort.completion[metric].effort !== Infinity) {
                    rangeValues.push(effort);
                }
            }

            effort = filteredValues.find(v => v.range === '8w');
            if (effort !== undefined) {
                if (effort.completion[metric].effort !== undefined && effort.completion[metric].effort !== Infinity) {
                    rangeValues.push(effort);
                }
            }
            effort = filteredValues.find(v => v.range === '12w');
            if (effort !== undefined) {
                if (effort.completion[metric].effort !== undefined && effort.completion[metric].effort !== Infinity) {
                    rangeValues.push(effort);
                }
            }
            effort = filteredValues.find(v => v.range === 'all');
            if (effort !== undefined) {
                if (effort.completion[metric].effort !== undefined && effort.completion[metric].effort !== Infinity) {
                    rangeValues.push(effort);
                }
            }
            if (rangeValues.length === 0) {
                return '-';
            } else {
                return Math.round(rangeValues[0].completion[metric].effort, 1);
            }

        } else {
            return '-';
        }
    }

    getVelocityBar(dataset) {
        const { defaultPoints } = this.props;
        let metric = 'points';
        if (!defaultPoints) {metric = 'issues';}

        if (dataset !== undefined ) {
            dataset = dataset.filter(v => v.completion[metric].effort !== Infinity);
            dataset = dataset.map((v) => {
                return {x: v.range, y: v.completion[metric].effort}
            });
            return dataset;
        } else {
            return [];
        }
    }

    render() {
        const { velocity } = this.props;
        return (
            <CustomCard
                headerTitle="Remaining work"
                headerFactTitle="Days to Completion"
                headerFactValue={this.getTimeToCompletion(velocity.velocity) + " days"}
            >
                <VelocityBarHorizontal data={this.getVelocityBar(velocity.velocity)} />
            </CustomCard>
        );
    }
}

DaysToCompletion.propTypes = {
    velocity: PropTypes.object.isRequired,
    defaultPoints: PropTypes.bool.isRequired,
};

export default DaysToCompletion;
