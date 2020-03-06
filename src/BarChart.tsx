import * as React from "react";
import { Motion, spring } from "react-motion";

import { scaleBand, scaleLinear } from "d3";

import { maxProp, prop, reduceAxisLabels, getColour, tooltipFormat } from "./utils";
import { XAxis, YAxis } from "./Axis";
import focusedHOC, { InjectedProps } from "./focusedHOC";

export interface Data {
    uniqueKey?: string;
    key: string;
    value: number;
}

interface Props {
    data: Data[];
    width: number;
    height: number;
    colour: string;

    valueFormat?: (value: number) => string;
    tooltipValueFormat?: (value: number) => string;
    xAxisTicksRotate?: number;
    xAxisLabel?: string;
    yAxisLabel?: string;
    filters?: string[];
    onFilter?: (key: string) => void;
}

interface State {
    leftAxisMaxWidth: number;
    bottomAxisMaxWidth: number;
}

class BarChart extends React.Component<Props & InjectedProps, State> {
    constructor(props) {
        super(props);
        this.state = {
            leftAxisMaxWidth: 0,
            bottomAxisMaxWidth: 0,
        };
    }

    public render() {
        const { width, height, data, filters, colour, focused, valueFormat, tooltipValueFormat, onFilter, onFocus, xAxisTicksRotate, xAxisLabel, yAxisLabel } = this.props;
        const { leftAxisMaxWidth, bottomAxisMaxWidth } = this.state;
        const  margin = { top: 10, right: 10, bottom: 10, left: 10 };
        const tickPadding = 9;
        const leftLabelHeight = yAxisLabel ? 19 : 0;
        const bottomLabelHeight = xAxisLabel ? 19 : 0;
        const w = width - margin.left - margin.right - leftAxisMaxWidth - tickPadding - leftLabelHeight;
        const h = height - margin.top - margin.bottom - bottomAxisMaxWidth - tickPadding - bottomLabelHeight;
        const keys = data.map(prop("key")) as string[];

        const scaleX = scaleBand()
            .range([0, w])
            .padding(0.1)
            .domain(keys);
        const scaleY = scaleLinear()
            .range([h, 0])
            .domain([0, maxProp("value", data)]);

        return (
            <svg width={width} height={height} className="BarChart">
                <g transform={`translate(${margin.left + leftAxisMaxWidth + tickPadding + leftLabelHeight}, ${margin.top})`}>
                    <XAxis
                        height={h}
                        scale={scaleX}
                        rotate={xAxisTicksRotate}
                        tickFormat={reduceAxisLabels(w, keys)} axisHeightUpdated={(he) => this.bottomAxisHeightUpdated(he)}
                    />
                    <YAxis scale={scaleY} tickFormat={valueFormat} axisWidthUpdated={(we) => this.axisUpdated(we)} />

                    {data.map(({ key, value, uniqueKey }) => (
                        <g key={uniqueKey || `${key}-${value}`}>
                            <Motion
                                defaultStyle={{ x: h }}
                                style={{ x: spring(scaleY(value)) }}
                            >
                                {({ x }) => {
                                    const heightFinal = h - x;
                                    return (
                                        <rect
                                            x={scaleX(key)}
                                            y={x}
                                            cursor={onFilter ? "pointer" : "default"}
                                            width={scaleX.bandwidth()}
                                            height={heightFinal > 0 ? heightFinal : 0}
                                            fill={getColour(colour, key, filters, focused === key)}
                                            onClick={onFilter ? () => onFilter(key) : undefined}
                                            onMouseEnter={() => onFocus(key)}
                                            onMouseLeave={() => onFocus(undefined)}
                                        />
                                    );
                                }}
                            </Motion>

                            <title>
                                {`${key}: ${tooltipFormat(value, tooltipValueFormat, valueFormat)}`}
                            </title>
                        </g>
                    ))}

                    {xAxisLabel ? (<text className="BarChart__label" transform={`translate(${w / 2}, ${height})`} dy="-1em" textAnchor="middle">{xAxisLabel}</text>) : null}
                    {yAxisLabel ? (<text className="BarChart__label" transform="rotate(-90)" x={-(height / 2)} y={-leftAxisMaxWidth} dy="-1em" textAnchor="middle">{yAxisLabel}</text>) : null}
                </g>
            </svg>
        );
    }

    private axisUpdated(width: number) {
        if (this.state.leftAxisMaxWidth !== width) {
            this.setState({ leftAxisMaxWidth: width });
        }
    }

    private bottomAxisHeightUpdated(height: number) {
        if (this.state.bottomAxisMaxWidth !== height) {
            this.setState({ bottomAxisMaxWidth: height });
        }
    }
}

export default focusedHOC(BarChart);
