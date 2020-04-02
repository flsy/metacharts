import * as React from "react";
import { Motion, spring } from "react-motion";

import { scaleBand, scaleLinear } from "d3";

import { getColour, maxProp, prop, reduceAxisLabels, tooltipFormat } from "../utils";
import { XAxis, YAxis } from "../Axis";
import focusedHOC, { InjectedProps } from "../focusedHOC";
import { IBarChart } from '../interfaces';

const BarChart: React.FC<IBarChart & InjectedProps> = ({ width, height, data, filters, colour, focused, valueFormat, tooltipValueFormat, onFilter, onFocus, xAxisTicksRotate, xAxisLabel, yAxisLabel }) => {
    const [leftAxisMaxWidth, setLeftAxisMaxWidth] = React.useState(0);
    const [bottomAxisMaxWidth, setBottomAxisMaxWidth] = React.useState(0);

    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
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

    const axisUpdated = (width: number) => {
        if (leftAxisMaxWidth !== width) {
            setLeftAxisMaxWidth(width)
        }
    };

    const bottomAxisHeightUpdated = (height: number) => {
        if (bottomAxisMaxWidth !== height) {
            setBottomAxisMaxWidth(height)
        }
    };

    return (
        <svg width={width} height={height} className="BarChart">
            <g transform={`translate(${margin.left + leftAxisMaxWidth + tickPadding + leftLabelHeight}, ${margin.top})`}>
                <XAxis
                    height={h}
                    scale={scaleX}
                    rotate={xAxisTicksRotate}
                    tickFormat={reduceAxisLabels(w, keys)}
                    axisHeightUpdated={(he) => bottomAxisHeightUpdated(he)}
                />
                <YAxis scale={scaleY} tickFormat={valueFormat} axisWidthUpdated={(we) => axisUpdated(we)} />

                {data.map(({ key, value, uniqueKey }) => (
                    <g key={uniqueKey || `${key}-${value}`}>
                        <Motion defaultStyle={{ x: h }} style={{ x: spring(scaleY(value)) }}>
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

                {xAxisLabel ? (<text className="BarChart__label" transform={`translate(${w / 2}, ${height})`} dy="-1em"
                                     textAnchor="middle">{xAxisLabel}</text>) : null}
                {yAxisLabel ? (
                    <text className="BarChart__label" transform="rotate(-90)" x={-(height / 2)} y={-leftAxisMaxWidth}
                          dy="-1em" textAnchor="middle">{yAxisLabel}</text>) : null}
            </g>
        </svg>
    );
}

export default focusedHOC(BarChart);
