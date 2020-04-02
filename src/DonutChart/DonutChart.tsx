import { arc, pie } from "d3";
import * as React from "react";
import { Motion, spring } from "react-motion";

import focusedHOC, { InjectedProps } from "../focusedHOC";
import { getColour, tooltipFormat } from "../utils";
import { IDonutChart, IDonutChartData } from '../interfaces';

const DonutChart = ({
                        data = [],
                        width,
                        height,
                        filters = [],
                        onFilter,
                        onFocus,
                        focused,
                        children,
                        valueFormat,
                        tooltipValueFormat,
                    }: IDonutChart & InjectedProps) => {
    const radius = Math.min(width, height) / 2;

    const getArc: any = arc()
        .outerRadius(radius)
        .innerRadius(radius - (radius / 5));

    const getPie = pie<IDonutChartData>().value((d: IDonutChartData): number => d.value);

    const cursor = onFilter ? "pointer" : "default";

    return (
        <div className="DonutChart" style={{ width }}>
            <svg width={width} height={height}>
                <g transform={`translate(${width / 2}, ${height / 2})`}>
                    {getPie(data)
                        .filter((d) => !!d.data.colour)
                        .map((slice) => (
                            <Motion
                                key={`${slice.data.label}-${slice.data.value}`}
                                defaultStyle={{
                                    startAngle: slice.startAngle,
                                    endAngle: slice.endAngle,
                                    padAngle: slice.padAngle,
                                }}
                                style={{
                                    startAngle: spring(slice.startAngle),
                                    endAngle: spring(slice.endAngle),
                                    padAngle: spring(slice.padAngle),
                                }}
                            >
                                {(value) => (
                                    <g>
                                        <path
                                            fill={getColour(slice.data.colour, slice.data.label, filters, slice.data.label === focused)}
                                            d={getArc(value)}
                                            stroke="white"
                                            strokeWidth={1}
                                            cursor={cursor}
                                            onClick={
                                                onFilter
                                                    ? (event) => onFilter(slice.data.label)
                                                    : undefined
                                            }
                                            onMouseOver={() => onFocus(slice.data.label || undefined)}
                                            onMouseOut={() => onFocus(undefined)}
                                        />
                                        <title>
                                            {`${slice.data.label ? `${slice.data.label}: ` : ""}${tooltipFormat(slice.data.value, tooltipValueFormat, valueFormat)}` }
                                        </title>
                                    </g>
                                )}
                            </Motion>
                        ))}
                    {children}
                </g>
            </svg>

            <div className="legend">
                {data.filter((d) => !!d.label).map(({ label, value, colour }, index) => (
                    <Motion
                        key={label}
                        defaultStyle={{ x: 0 }}
                        style={{ x: spring(value, { precision: 10 }) }}
                    >
                        {(val) => {
                            const circleSize = label === focused ? 10 : 6;
                            return (
                                <div
                                    onClick={onFilter ? () => onFilter(label) : undefined}
                                    onMouseOver={() => onFocus(label || undefined)}
                                    onMouseOut={() => onFocus(undefined)}
                                    className="label"
                                    style={{ cursor }}
                                >
                                    <div className="legend-item">
                                        <svg height="20" width="20">
                                            <Motion
                                                defaultStyle={{ x: 0 }}
                                                style={{ x: spring(circleSize) }}
                                            >
                                                {({ x }) => (
                                                    <circle cx="10" cy="10" r={x} fill={colour} />
                                                )}
                                            </Motion>
                                        </svg>
                                        <div>{label}</div>
                                        <div>{valueFormat ? valueFormat(val.x) : val.x}</div>
                                    </div>
                                </div>
                            );
                        }}
                    </Motion>
                ))}
            </div>
        </div>
    );
};

export default focusedHOC(DonutChart);
