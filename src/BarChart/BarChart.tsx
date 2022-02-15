import * as React from "react";
import { Motion, spring } from "react-motion";

import { scaleBand, ScaleLinear, scaleLinear } from "d3";

import { getColour, maxProp, prop, reduceAxisLabels } from "../utils";
import focusedHOC, { InjectedProps } from "../focusedHOC";
import { IBarChart } from '../interfaces';
import XAxis from '../Axis/XAxis';
import YAxis from '../Axis/YAxis';

const BarChart = ({ width, height, data, filters, colour, colours, focused, keyFormat, valueFormat, onFilter, onFocus, xAxisTicksRotate, xAxisLabel, yAxisLabel, xAxisTicksTooltip, xAxisTicksTooltipFormat }: IBarChart & InjectedProps) => {
    const [leftAxisMaxWidth, setLeftAxisMaxWidth] = React.useState(0);
    const [bottomAxisMaxWidth, setBottomAxisMaxWidth] = React.useState(0);

    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const tickPadding = 9;
    const fontSize = 14;
    const leftLabelHeight = yAxisLabel ? 19 : 0;
    const bottomLabelHeight = xAxisLabel ? 19 : 0;
    const w = width - margin.left - margin.right - leftAxisMaxWidth - tickPadding - leftLabelHeight;
    const h = height - margin.top - margin.bottom - bottomAxisMaxWidth - tickPadding - bottomLabelHeight;
    const keys = data.map(prop("key")) as string[];

    const scaleX = scaleBand()
        .range([0, w])
        .padding(0.1)
        .domain(keys);

    const scaleY: ScaleLinear<number, any> = scaleLinear()
        .range([h, 0])
        .domain([0, maxProp("value", data) ?? 1]);

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

    const prepared = data.filter(d => d.value !== 0);

    return (
        <svg width={width} height={height} className="BarChart">
            <g transform={`translate(${margin.left + leftAxisMaxWidth + tickPadding + leftLabelHeight}, ${margin.top})`}>
                {prepared.map(({ key, value, uniqueKey }, index) => (
                    <g key={uniqueKey || `${key}-${value}`}>
                        <Motion defaultStyle={{ x: h }} style={{ x: spring(scaleY(value)) }}>
                            {({ x }) => {
                                const heightFinal = h - x;
                                const c = colours && colours[index] ? colours[index] : colour;

                                return (
                                    <rect
                                        x={scaleX(key)}
                                        y={x}
                                        cursor={onFilter ? "pointer" : "default"}
                                        width={scaleX.bandwidth()}
                                        height={heightFinal > 0 ? heightFinal : 0}
                                        fill={getColour(c, key, filters, focused === key)}
                                        onClick={onFilter ? () => onFilter(key) : undefined}
                                        onMouseEnter={() => onFocus(key)}
                                        onMouseLeave={() => onFocus(undefined)}
                                    />
                                );
                            }}
                        </Motion>

                        <title>
                            {xAxisTicksTooltipFormat ? xAxisTicksTooltipFormat(key, index) : null}
                        </title>
                    </g>
                ))}

                <XAxis
                    height={h}
                    scale={scaleX}
                    rotate={xAxisTicksRotate}
                    reduceAxisLabels={reduceAxisLabels(w, keys)}
                    tickFormat={keyFormat}
                    axisHeightUpdated={(he) => bottomAxisHeightUpdated(he)}
                    xAxisTicksTooltip={xAxisTicksTooltip}
                    xAxisTicksTooltipFormat={xAxisTicksTooltipFormat}
                />
                <YAxis scale={scaleY} ticks={prepared.length === 0 ? 1 : undefined} tickFormat={valueFormat} axisWidthUpdated={(we) => axisUpdated(we)} />

                {xAxisLabel ? (<text className="BarChart__label" transform={`translate(${w / 2}, ${height})`} dy="-1em" textAnchor="middle" fontSize={fontSize}>{xAxisLabel}</text>) : null}
                {yAxisLabel ? (<text className="BarChart__label" transform="rotate(-90)" x={-(height / 2)} y={-leftAxisMaxWidth} dy="-1em" textAnchor="middle" fontSize={fontSize}>{yAxisLabel}</text>) : null}
            </g>
        </svg>
    );
}

export default focusedHOC(BarChart);
