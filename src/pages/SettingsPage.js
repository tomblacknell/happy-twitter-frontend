import React, { Component } from 'react';
import Table, { TableBody, TableRowColumn, TableRow } from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import { reactLocalStorage } from 'reactjs-localstorage';
import ApiUtils from '../utils/ApiUtils';

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings:undefined
        };
    }

    componentWillMount() {
        const settings = reactLocalStorage.getObject("settings");
        this.setState({settings:settings});
    }

    updateSettings() {
        //console.log(this.state.settings);
        reactLocalStorage.setObject("settings", this.state.settings);
    }

    handleSetting1Toggle(event, isInputToggled) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                setting1: isInputToggled
            }
        }));
    }

    handleSetting2Toggle(event, isInputToggled) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                setting2: isInputToggled
            }
        }));
    }

    handleSetting3Toggle(event, isInputToggled) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                setting3: isInputToggled
            }
        }));
    }

    handleSetting4Toggle(event, isInputToggled) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                setting4: isInputToggled
            }
        }));
    }

    handleSetting5Toggle(event, isInputToggled) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                setting5: isInputToggled
            }
        }));
    }

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
        );
    }
}

export default SettingsPage;