import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Input from '@material-ui/core/Input';

class EditMilestoneState extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        const { setNewState } = this.props;
        if (!event.target.value) {
            setNewState(null);
        } else {
            setNewState(event.target.value);
        }
    };

    render() {
        const { newState } = this.props;
        let state = newState;
        if (state === null) {
            state = '';
        }
        return (
            <Input
                placeholder="Enter a due date"
                inputProps={{
                    'aria-label': 'Description',
                }}
                value={state}
                onChange={this.handleChange}
            />
        );
    }
}

EditMilestoneState.propTypes = {
    newState: PropTypes.string,
    setNewState: PropTypes.func.isRequired,
};

const mapState = state => ({
    newState: state.milestonesEdit.newState,
});

const mapDispatch = dispatch => ({
    setNewState: dispatch.milestonesEdit.setNewState,
});

export default connect(mapState, mapDispatch)(EditMilestoneState);