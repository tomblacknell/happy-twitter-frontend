import React, { Component } from "react";
import ApiUtils from '../utils/ApiUtils';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import WordCloud from 'react-d3-cloud';

class LocationTable extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    fetchTweetsByLocation = () => {
        ApiUtils.fetchTweetsByLocation()
            .then(this.handleFetchTweetsByLocationSuccess)
            .catch(this.handleFetchTweetsByLocationFailure);
    };

    handleFetchTweetsByLocationSuccess = response => {
        console.log("Succeeded in fetching tweets by location");
        console.log(response);
        this.setState({data:response});
    };

    handleFetchTweetsByLocationFailure = error => {
        console.log("Failed to fetch tweets by location");
    };

    componentWillMount() {
        this.fetchTweetsByLocation();
    }

    render() {

        const styles = {
            propContainer: {
                width: 200,
                overflow: 'hidden',
                margin: '20px auto 0',
            },
            propToggleHeader: {
                margin: '20px auto 10px',
            },
        };

        return (
        <div>
            <Table
                fixedHeader={true}
                fixedFooter={true}
                selectable={false}
                multiSelectable={false}
            >
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    enableSelectAll={false}
                >
                    <TableRow>
                        <TableHeaderColumn tooltip="Region">Region</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Total">Total</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    deselectOnClickaway={false}
                    showRowHover={true}
                    stripedRows={true}
                >
                    {this.state.data.slice(0,9).map(row => (
                        <TableRow>
                            <TableRowColumn>{row._id}</TableRowColumn>
                            <TableRowColumn>{row.number}</TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        )
    }
}

export default LocationTable;