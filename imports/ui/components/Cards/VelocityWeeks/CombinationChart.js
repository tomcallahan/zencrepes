import React, { Component } from 'react';
import PropTypes from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
//require('highcharts/highcharts-more')(Highcharts);

const styles = theme => ({
    root: {
        /*
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        */
    },
    toolbarButtons: {
        flex: 1,
    },
});

class CombinationChart extends Component {
    constructor(props) {
        super(props);
    }

    getLegend = () => {
        const { completed, max } = this.props;
        return completed + " / " + max;
    };

    render() {
        const { classes, dataset, metric } = this.props;
        console.log(dataset);
        let updatedOptions = {
            title: null,
            xAxis: {
                categories: dataset.map(week => new Date(week.weekStart).toDateString()),
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e. %b'
                }
            },
            yAxis: {
                title: metric
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: [{
                type: 'column',
                name: 'Weekly completion',
                data: dataset.map((week) => {
                    if (week.completion[metric].count - week.scopeChangeCompletion[metric].count > 0) {
                        return week.completion[metric].count - week.scopeChangeCompletion[metric].count;
                    } else {
                        return 0;
                    }
                })
            }, {
                type: 'column',
                name: 'Scope Change',
                data: dataset.map(week => week.scopeChangeCompletion[metric].count)
            }, {
                type: 'spline',
                name: 'Completion evolution',
                data: dataset.map(week => week.completion[metric].velocity),
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            }, {
                type: 'spline',
                name: 'Scope change evolution',
                data: dataset.map(week => week.scopeChangeCompletion[metric].velocity),
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[4],
                    fillColor: 'white'
                }
            }],
            credits: {
                enabled: false
            }
        };

        return (
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'chart'}
                options={updatedOptions}
            />
        );
    }
}

CombinationChart.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(CombinationChart);