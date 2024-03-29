import { scaleBand, scaleLinear } from "d3";
import * as React from "react";
import { Motion, spring } from "react-motion";

import { maxProp } from "../utils";
import focusedHOC, { InjectedProps } from "../focusedHOC";
import { getColour, tooltipFormat } from "../utils";
import { IRowChart } from '../interfaces';

const RowChart: React.FC<IRowChart & InjectedProps> = ({ isAnimated, data = [], width, filters = [], focused, onFilter, onFocus, colour, valueFormat, tooltipValueFormat, labelWidth = 80, valueLabelWidth = 40, xAxisLabel, yAxisLabel }) => {
    const rowHeight = 40;
    const fontSize = 14;
    const labelsHeight = fontSize + 4;
    const height = rowHeight * data.length;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const w = width - margin.left - margin.right;
    const maxValue = maxProp("value", data);
    const labelBottomPadding = 4;
    const valueLabelLeftPadding = 5;

    const leftAxisMaxWidth = 0;
    const tickPadding = 9;
    const leftLabelHeight = yAxisLabel ? 19 : 0;

    const xScale: any = scaleLinear()
        .range([0, w - labelWidth - valueLabelWidth - valueLabelLeftPadding])
        .domain([0, maxValue]);

    const yScale = scaleBand()
        .rangeRound([0, height - margin.top - margin.bottom])
        .domain(data.map((d) => d.key));

    return (
        <svg width={width} height={height} className="RowChart">
            <g transform={`translate(${margin.left + leftAxisMaxWidth + tickPadding + leftLabelHeight}, ${margin.top})`}>
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
                                    const widthScaled = xScale(isAnimated ? style.width : d.value);
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

                            <text y={y + labelsHeight - labelBottomPadding} x={0} fontSize={fontSize}>{d.key}</text>

                            <text y={y + labelsHeight - labelBottomPadding} x={xScale(maxValue) + labelWidth + valueLabelLeftPadding} fontSize={fontSize}>
                                {valueFormat ? valueFormat(d.value) : d.value}
                            </text>

                            <title>
                                {`${d.key}: ${tooltipFormat(d.value, tooltipValueFormat, valueFormat)}`}
                            </title>
                        </g>
                    );
                })}

                {xAxisLabel ? (<text className="RowChart__label" transform={`translate(${w / 2}, ${height})`} dy="-1em" textAnchor="middle" fontSize={fontSize}>{xAxisLabel}</text>) : null}
                {yAxisLabel ? (<text className="RowChart__label" transform="rotate(-90)" x={-(height / 2)} y={-leftAxisMaxWidth} dy="-1em" textAnchor="middle" fontSize={fontSize}>{yAxisLabel}</text>) : null}

            </g>
        </svg>
    );
};

export default focusedHOC(RowChart);
