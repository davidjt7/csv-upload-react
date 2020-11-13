import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Title from './Title';

export default function InputStats(props) {
    return (
        <div>
            {props.mean && props.median && props.maximum && props.minimum ? (
                <div>
                    <Title>Input Stats</Title>
                    <Typography variant="h6">Mean: {props.mean}</Typography>
                    <Typography variant="h6">Median: {props.median}</Typography>
                    <Typography variant="h6">Maximum: {props.maximum}</Typography>
                    <Typography variant="h6">Minimum: {props.minimum}</Typography>
                    <Divider />
                    <br />
                    <Typography variant="h6">Conversion Rate (INR to USD): {props.rate.toFixed(4)}</Typography>
                    <Typography variant="h6">Date and Time: {(new Date(props.timestamp)).toDateString()} {(new Date(props.timestamp)).toTimeString().substr(0, 8)}</Typography>
                </div>
            )
                :
                (
                    <div>
                        <Title>Upload a CSV</Title>
                        <br />
                        <Typography variant="h6">Stats will be displayed here</Typography>
                        <br />
                        <br />
                    </div>
                )}
        </div>
    );
}

InputStats.propTypes = {
    children: PropTypes.node,
};