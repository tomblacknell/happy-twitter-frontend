import React, { Component } from 'react';
import Table, { TableBody, TableRowColumn, TableRow } from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import { reactLocalStorage } from 'reactjs-localstorage';
import Snackbar from 'material-ui/Snackbar';

class SettingsPage extends   Component {
    constructor(props) {
        super(props);
        this.state = {
            settings:undefined,
            open:false
        };
    }

    componentWillMount() {
        const settings = reactLocalStorage.getObject("settings");
        this.setState({settings:settings});
    }

    updateSettings() {
        reactLocalStorage.setObject("settings", this.state.settings);
    }

    handleSetting1Toggle(event, isInputToggled) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                setting1: isInputToggled
            },
            open:true
        }));
    }

    handleSetting2Toggle(event, isInputToggled) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                setting2: isInputToggled
            },
            open:true
        }));
    }

    handleSetting3Toggle(event, isInputToggled) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                setting3: isInputToggled
            },
            open:true
        }));
    }

    handleSetting4Toggle(event, isInputToggled) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                setting4: isInputToggled
            },
            open:true
        }));
    }

    handleSetting5Toggle(event, isInputToggled) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                setting5: isInputToggled
            },
            open:true
        }));
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        this.updateSettings();

        const styles = {
            block: {
                maxWidth: 250,
            },
            toggle: {
                marginBottom: 16,
            },
            thumbOff: {
                backgroundColor: '#ffcccc',
            },
            trackOff: {
                backgroundColor: '#ff9d9d',
            },
            thumbSwitched: {
                backgroundColor: 'red',
            },
            trackSwitched: {
                backgroundColor: '#ff9d9d',
            },
            labelStyle: {
                color: 'red',
            },
        };

        const { settings } = this.state;

        return (
            <div class="keen-dashboard" style={{"padding-top":"20px"}}>
                <div class="row">
                    <div class="col-sm-3">
                    </div>
                    <div class="col-sm-6">
                        <div class="chart-wrapper">
                            <div class="chart-stage">
                                <div id="grid-1-1">
                                    <Table selectable={false}>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <Toggle
                                                        label="Setting 1"
                                                        defaultToggled={settings.setting1}
                                                        style={styles.toggle}
                                                        onToggle={this.handleSetting1Toggle.bind(this)}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <Toggle
                                                        label="Setting 2"
                                                        defaultToggled={settings.setting2}
                                                        style={styles.toggle}
                                                        onToggle={this.handleSetting2Toggle.bind(this)}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <Toggle
                                                        label="Setting 3"
                                                        defaultToggled={settings.setting3}
                                                        style={styles.toggle}
                                                        onToggle={this.handleSetting3Toggle.bind(this)}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <Toggle
                                                        label="Setting 4"
                                                        defaultToggled={settings.setting4}
                                                        style={styles.toggle}
                                                        onToggle={this.handleSetting4Toggle.bind(this)}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <Toggle
                                                        label="Setting 5"
                                                        defaultToggled={settings.setting5}
                                                        style={styles.toggle}
                                                        onToggle={this.handleSetting5Toggle.bind(this)}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                    </div>
                </div>
                <Snackbar
                    open={this.state.open}
                    message="Setting saved"
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

export default SettingsPage;