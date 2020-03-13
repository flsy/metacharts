import { scaleBand, scaleLinear } from "d3";
import * as React from "react";
import { Motion, spring } from "react-motion";

import { maxProp } from "../utils";
import focusedHOC, { InjectedProps } from "../focusedHOC";
import { getColour, tooltipFormat } from "../utils";

export interface Data {
    key: string;
    value: number;
}

interface Props {
    data: Data[];
    width: number;
    colour: string;

    valueFormat?: (value: number) => string;
    tooltipValueFormat?: (value: number) => string;
    filters?: string[];
    onFilter?: (label: string) => void;
    labelWidth?: number;
    valueLabelWidth?: number;
}

const RowChart = ({ data = [], width, filters = [], focused, onFilter, onFocus, colour, valueFormat, tooltipValueFormat, labelWidth = 80, valueLabelWidth = 40 }: Props & InjectedProps) => {
    const rowHeight = 40;
    const height = rowHeight * data.length;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const w = width - margin.left - margin.right;
    const maxValue = maxProp("value", data);
    const labelsHeight = 20;
    const labelBottomPadding = 4;
    const valueLabelLeftPadding = 5;

    const xScale = scaleLinear()
        .range([0, w - labelWidth - valueLabelWidth - valueLabelLeftPadding])
        .domain([0, maxValue]);
    const yScale = scaleBand()
        .rangeRound([0, height - margin.top - margin.bottom])
        .domain(data.map((d) => d.key));

    return (
        <svg width={width} height={height} className="RowChart">
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {data.map((d) => {
                    const y = yScale(d.key) || 0;
                    return (
                        <g
                            key={d.key}
                            cursor={onFilter ? "pointer" : "default"}
                            onClick={onFilter ? (event) => onFilter(d.key) : undefined}
                            onMouseOver={(event) => onFocus(d.key)}
                            onMouseOut={(event) => onFocus(undefined)}
                        >
                            <Motion
                                defaultStyle={{ width: 0 }}
                                style={{ width: spring(d.value) }}
                            >
                                {(style) => {
                                    const widthScaled = xScale(style.width);
                                    return (
                                        <rect
                                            fill={getColour(colour, d.key, filters, focused === d.key)}
                                            x={labelWidth}
                                            y={y}
                                            width={widthScaled > 0 ? widthScaled : 0}
                                            height={rowHeight / 2}
                                        />
                                    );
                                }}
                            </Motion>

                            <text y={y + labelsHeight - labelBottomPadding} x={0}>{d.key}</text>

                            <text y={y + labelsHeight - labelBottomPadding} x={xScale(maxValue) + labelWidth + valueLabelLeftPadding}>
                                {valueFormat ? valueFormat(d.value) : d.value}
                            </text>

                            <title>
                                {`${d.key}: ${tooltipFormat(d.value, tooltipValueFormat, valueFormat)}`}
                            </title>
                        </g>
                    );
                })}
            </g>
        </svg>
    );
};

export default focusedHOC(RowChart);
