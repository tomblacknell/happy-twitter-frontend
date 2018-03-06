import React, { Component } from 'react';
import { OrdinalFrame } from 'semiotic';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, data:[] };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    generateData() {
        let data = [];
        for (let i = 0; i < 96; i++) {
            data.push({time:(i*15).toString(), tweets:Math.floor(Math.random()*10)});
        }
        this.setState({data:data});
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.generateData();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    addDataPoint() {
        let oldData = this.state.data;
        let newTime = oldData[oldData.length-1].time + 15;
        oldData.shift();
        oldData.push({time:newTime.toString(),tweets:Math.floor(Math.random()*10)});
        this.setState({data:oldData});
    }

    render() {

        const barChartStyle = {
            position: 'fixed',
            left: '0px',
            bottom: '0px',
            height: '93px',
            width: '100%',
        };

        return (
            <div style={barChartStyle}>
                <button onClick={this.addDataPoint.bind(this)}>Add Data Point</button>
                <OrdinalFrame
                    size={[this.state.width, 75]}
                    data={this.state.data}
                    oAccessor={"time"}
                    rAccessor={"tweets"}
                    style={{ fill: "#f0a535", stroke: "white" }}
                    type={"bar"}
                    oLabel={false}
                />
            </div>
        );
    }
}

export default BarChart;