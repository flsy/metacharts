import React, { Component } from 'react';
import { DonutChart } from '../export';
import { Data } from './DonutChart';

const data = [
    {
        label: "male",
        value: 30,
        colour: "#88BB88"
    },
    {
        label: "female",
        value: 60,
        colour: "#8888CC"
    },
    {
        label: "unknown",
        value: 10,
        colour: "#AA8888"
    }
];

interface IState {
    width: number;
    data: Data[];
    filters: string[];
    focusedLabel?: string;
}


class DonutChartDemo extends Component<object, IState> {

    constructor(props: object) {
        super(props);
        this.state = {
            width: 300,
            data,
            filters: [],
            focusedLabel: undefined
        }
    }

    public filter(label: string) {
        const { filters } = this.state;
        if (filters.find(r => r === label)) {
            this.setState({
                filters: filters.filter(d => d !== label)
            })
        } else {
            filters.push(label);
            this.setState({
                filters
            })
        }
    }

    public render() {
        // console.log(this.state.width)
        return (
            <div style={{ display: 'flex'}}>
                <div style={{ width: '400px' }}>
                    <DonutChart
                        width={this.state.width}
                        height={200}
                        data={this.state.data}
                        filters={this.state.filters}
                        onFilter={(label) => this.filter(label)}
                        valueFormat={(x) => `${Math.floor(x)}%`}

                        // onMouseOver={(label) => this.setState({ focusedLabel: label })}
                        // onMouseOut={(label) => this.setState({ focusedLabel: undefined })}
                        // focusedLabel={this.state.focusedLabel}
                    />
                </div>

                <div style={{ width: "250px" }}>
                    <p>filters</p>
                    [{this.state.filters.map(f => (`"${f}"`)).join(", ")}]
                    <button onClick={() => this.setState({ filters: [] })}>reset</button>

                    <p>values</p>
                    <input type="range" min="0" max="90" step="1" onChange={(event) => {
                        const male = parseInt(event.target.value, 10);
                        this.setState({
                            data: this.state.data.map(e => {
                                if (e.label === "male") { return { ...e, value: male } }
                                if (e.label === "female") { return { ...e, value: 100 - 10 - male } }

                                return e;
                            })
                        })
                    }}
                    />

                    <p>width: {this.state.width}px</p>
                    <input type="range" min="50" max="400" step="10" value={this.state.width} onChange={(event) => {
                        this.setState({
                            width: parseInt(event.target.value, 10)
                        })
                    }}
                    />
                </div>
            </div>
        )
    }
}

export default DonutChartDemo;
