import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Clock from 'react-live-clock';
import TweetTicker from '../components/TweetTicker';

export default class ToolbarExamplesSimple extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {

        const clockStyle = {
            fontSize: "24px",
            color:"#444"
        };

        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <TweetTicker/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarSeparator />
                    <Clock style={clockStyle} format={'HH:mm:ss'} ticking={true} timezone={'GMT'} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}