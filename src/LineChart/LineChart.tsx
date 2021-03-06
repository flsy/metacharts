import * as React from "react";

import { bisector, extent, line, scaleLinear, } from "d3";

import XAxis from "../Axis/XAxis";
import YAxis from "../Axis/YAxis";
import FilterX from "./FilterX";
import Focus from "./Focus";
import { ILineChart, ILineChartData } from '../interfaces';

const margin = { top: 10, right: 10, bottom: 20, left: 20 };

const filterHandlePadding = 2; // px

interface State {
    xAxisHeight: number;
    yAxisWidth: number;

    focusedX: number;
    focusedY: number;

    isFocused: boolean;
    isFiltering: boolean;
    isExtending: boolean;
    isMoving: boolean;

    filterStart?: number;
    filterEnd?: number;

    filterFocused: boolean;
    filterFromFocused: boolean;
    filterToFocused: boolean;

    movingFromDiff?: number;
    movingToDiff?: number;
}

class LineChart extends React.Component<ILineChart, State> {
    private svg = React.createRef<any>();

    constructor(props: ILineChart) {
        super(props);
        this.bottomAxisUpdated = this.bottomAxisUpdated.bind(this);
        this.leftAxisUpdated = this.leftAxisUpdated.bind(this);

        this.state = {
            xAxisHeight: 0,
            yAxisWidth: 0,

            focusedX: 0,
            focusedY: 0,

            isFocused: false,
            isFiltering: false,
            isExtending: false,
            isMoving: false,

            filterStart: 0,
            filterEnd: 0,

            filterFocused: false,
            filterFromFocused: false,
            filterToFocused: false,

            movingFromDiff: undefined,
            movingToDiff: undefined,
        };
    }

    public scaleX(): any {
        const leftLabelHeight = this.state.yAxisWidth ? 19 : 0;
        const w = this.props.width - margin.left - margin.right - this.state.yAxisWidth - leftLabelHeight;

        return scaleLinear()
            .rangeRound([0, w])
            .domain(extent(this.props.data, (d) => d.key) as number[]);
    }

    public scaleY(): any {
        const bottomLabelHeight = this.props.xAxisLabel ? 19 : 0;
        const h = this.props.height - margin.top - margin.bottom - this.state.xAxisHeight - bottomLabelHeight;
        return scaleLinear()
            .rangeRound([h, 0])
            .domain(extent(this.props.data, (d) => d.value) as number[]);
    }

    public mousePosition(event: MouseEvent) {
        const position = this.svg.current.getBoundingClientRect();
        const leftLabelHeight = this.state.yAxisWidth ? 19 : 0;
        const x = event.pageX - margin.left - this.state.yAxisWidth - position.left - leftLabelHeight;

        return this.scaleX().invert(x);
    }

    public onMouseMove(event: MouseEvent) {
        const x = this.mousePosition(event);

        if (this.state.isMoving) {
            this.setState({
                filterStart: x - (this.state.movingFromDiff || 0),
                filterEnd: x + (this.state.movingToDiff || 0),
            });
        } else if (this.state.isExtending) {
            this.setState({
                filterEnd: x,
            });
        } else if (this.state.isFiltering) {
            this.setState({
                filterEnd: x,
                filterToFocused: true,
            });
        } else if (this.state.isFocused) {
            const { data } = this.props;

            const bisectValue = bisector<ILineChartData, number>((d) => d.key).left;

            const i = bisectValue(data, x);
            const d0 = data[i - 1];
            const d1 = data[i];

            if (!d0) {
                return;
            }
            if (!d1) {
                return;
            }

            const focusedNode = x - d0.key > d1.key - x ? d1 : d0;

            const scaleX = this.scaleX();
            const realX = scaleX(x);

            let filterFocused = false;
            let filterToFocused = false;
            let filterFromFocused = false;
            if (this.props.filterFrom && this.props.filterTo) {
                const realFrom = scaleX(this.props.filterFrom);
                const realTo = scaleX(this.props.filterTo);

                if (
                    realX - filterHandlePadding < realTo &&
                    realTo < realX + filterHandlePadding
                ) {
                    filterToFocused = true;
                } else if (
                    realX - filterHandlePadding < realFrom &&
                    realFrom < realX + filterHandlePadding
                ) {
                    filterFromFocused = true;
                } else if (
                    realFrom + filterHandlePadding <= realX &&
                    realX <= realTo - filterHandlePadding
                ) {
                    filterFocused = true;
                }
            }

            this.setState({
                focusedX: scaleX(focusedNode.key),
                focusedY: this.scaleY()(focusedNode.value),
                filterFocused,
                filterFromFocused,
                filterToFocused,
            });
        }
    }

    public onMouseDown(event: MouseEvent) {
        const x = this.mousePosition(event);

        if (this.state.filterFocused) {
            this.setState({
                filterStart: this.props.filterFrom,
                filterEnd: this.props.filterTo,
                isMoving: true,
                movingFromDiff: x - (this.props.filterFrom || 0),
                movingToDiff: (this.props.filterTo || 0) - x,
                isFocused: false,
            });
        } else if (this.state.filterToFocused) {
            // extending from Right
            this.setState({
                filterStart: this.props.filterFrom,
                filterEnd: this.props.filterTo,
                isExtending: true,
                isFocused: false,
            });
        } else if (this.state.filterFromFocused) {
            // extending from Left
            this.setState({
                filterStart: this.props.filterTo,
                filterEnd: this.props.filterFrom,
                isExtending: true,
                isFocused: false,
            });
        } else {
            // filtering
            this.setState({
                filterStart: x,
                filterEnd: x,
                isFiltering: true,
                isFocused: false,
            });
        }
    }

    public onMouseUp() {
        if (this.props.onFilter) {
            const { filterStart, filterEnd } = this.state;

            let from = filterStart;
            let to = filterEnd;
            if (filterStart && filterEnd && filterStart > filterEnd) {
                from = filterEnd;
                to = filterStart;
            } else if (from === to) {
                from = undefined;
                to = undefined;
            }

            if (!from || !to) {
                from = undefined;
                to = undefined;
            }

            this.props.onFilter({ from, to });
        }

        this.setState({
            filterStart: undefined,
            filterEnd: undefined,
            isFocused: true,
            isFiltering: false,
            isExtending: false,
            isMoving: false,
            movingFromDiff: undefined,
            movingToDiff: undefined,
        });
    }

    public cursor() {
        if (!this.props.onFilter) {
            return "default";
        }
        if (this.state.filterFocused) {
            return "move";
        }

        if (this.state.filterFromFocused) {
            return "ew-resize";
        }

        if (this.state.filterToFocused) {
            return "ew-resize";
        }
        return "crosshair";
    }

    private bottomAxisUpdated(height: number) {
        if (this.state.xAxisHeight !== height) {
            this.setState({ xAxisHeight: height })
        }
    }

    private leftAxisUpdated(width: number) {
        if (this.state.yAxisWidth !== width) {
            this.setState({ yAxisWidth: width })
        }
    }

    public render() {
        const { data, width, height, xAxisLabel, yAxisLabel, valueFormat, keyFormat, colour, xAxisTicksTooltip } = this.props;
        const leftLabelHeight = yAxisLabel ? 19 : 0;
        const bottomLabelHeight = xAxisLabel ? 19 : 0;
        const h = height - margin.top - margin.bottom - this.state.xAxisHeight - bottomLabelHeight;
        const scaleX = this.scaleX();

        const valueLine: any = line()
            .x((d: any) => scaleX(d.key))
            .y((d: any) => this.scaleY()(d.value));

        const filterFrom = this.props.filterFrom || 0;
        const filterTo = this.props.filterTo || 0;

        let filterStart = scaleX(Math.min(filterFrom, filterTo));
        let filterWidth = Math.abs(scaleX(filterFrom) - scaleX(filterTo));

        if (
            this.state.isFiltering ||
            this.state.isExtending ||
            this.state.isMoving
        ) {
            filterStart = scaleX(
                Math.min(this.state.filterStart || 0, this.state.filterEnd || 0),
            );
            filterWidth =
                this.state.filterEnd === 0
                    ? 0
                    : Math.abs(
                    scaleX(this.state.filterStart || 0) -
                    scaleX(this.state.filterEnd || 0),
                    );
        }

        const isFiltered = this.state.isFiltering || this.state.isExtending || filterFrom;

        return (
            <svg width={width} height={height} ref={this.svg}>
                <g transform={`translate(${margin.left + this.state.yAxisWidth + leftLabelHeight}, ${margin.top})`}>
                    <XAxis
                        height={h}
                        scale={this.scaleX()}
                        tickFormat={keyFormat}
                        rotate={this.props.xAxisTicksRotate}
                        axisHeightUpdated={this.bottomAxisUpdated}
                        xAxisTicksTooltip={xAxisTicksTooltip}
                    />
                    <YAxis
                        scale={this.scaleY()}
                        tickFormat={valueFormat}
                        axisWidthUpdated={this.leftAxisUpdated}
                    />

                    <path
                        d={valueLine(data)}
                        fill="none"
                        stroke={colour}
                        strokeWidth={1.5}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />

                    {this.state.isFocused ? (
                        <Focus x={this.state.focusedX} y={this.state.focusedY} height={h} />) : null}
                    {isFiltered ? (
                        <FilterX
                            height={h}
                            x={filterStart}
                            width={filterWidth}
                            colour={colour}
                            handlePadding={filterHandlePadding}
                            focusedFrom={this.state.filterFromFocused}
                            focusedTo={this.state.filterToFocused}
                        />
                    ) : null}

                    <rect
                        fill="none"
                        pointerEvents="all"
                        cursor={this.cursor()}
                        width={width - margin.left - margin.right - this.state.yAxisWidth - leftLabelHeight}
                        height={height - margin.top - margin.bottom - bottomLabelHeight}
                        onMouseMove={(event: any) => this.onMouseMove(event)}
                        onMouseOut={() => this.setState({ isFocused: false })}
                        onMouseOver={() => this.setState({ isFocused: true })}
                        onMouseDown={(event: any) => this.props.onFilter ? this.onMouseDown(event) : null}
                        onMouseUp={(event: any) => this.props.onFilter ? this.onMouseUp() : null}
                    />

                    {xAxisLabel ? <text transform={`translate(${width / 2}, ${height})`} dy="-1em" textAnchor="middle" fontSize={14}>{xAxisLabel}</text> : null}

                    {yAxisLabel ? <text transform="rotate(-90)" y={-this.state.yAxisWidth} x={-(height / 2)} dy="-1em" textAnchor="middle" fontSize={14}>{yAxisLabel}</text> : null}

                </g>
            </svg>
        );
    }
}

export default LineChart;
