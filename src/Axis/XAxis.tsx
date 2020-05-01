import { axisBottom, ScaleBand, ScaleLinear, select, Selection } from 'd3';
import * as React from 'react';
import { max } from '../utils';
import { textWidth } from './tools';

interface XAxisProps {
    scale: ScaleBand<string> | ScaleLinear<number, number>;
    height: number;
    tickFormat?: (value: string, index: number) => string;
    reduceAxisLabels?: (value: string, index: number) => string;
    rotate?: number;
    axisHeightUpdated?: (labelMaxWidth: number) => void;
    xAxisTicksTooltip?: boolean;
    xAxisTicksTooltipFormat?: (value: string, index: number) => string;
}

class XAxis extends React.Component<XAxisProps, { label?: string }> {
    // @ts-ignore
    private axis: SVGGElement | null;

    constructor(props: XAxisProps) {
        super(props);
        this.state = {
            label: undefined,
        }
    }

    public componentDidMount() {
        this.updateAxis();
    }

    public componentDidUpdate(prevProps: XAxisProps) {
        this.updateAxis();
    }

    public updateAxis() {
        const tickFormat = (value: any, index: number): any => {
            if (this.props.tickFormat) {
                return this.props.tickFormat(value, index)
            }
            return value;
        }

        if (!this.axis) {
            return;
        }

        // @ts-ignore
        const selected = select(this.axis).call(axisBottom(this.props.scale).tickSize(0).tickPadding(6).tickFormat(tickFormat));

        if (this.props.xAxisTicksTooltip) {
            const format = this.props.xAxisTicksTooltipFormat ? this.props.xAxisTicksTooltipFormat : d => `${d}`;


            selected
                .selectAll("g.tick text")
                .attr("label", format as any)
        }

        if (this.props.rotate) {
            selected.selectAll("g.tick text")
                .style("text-anchor", "end")
                .attr("dx", "-10")
                .attr("dy", "0")
                .attr("transform", `rotate(${this.props.rotate})`);

            if (this.props.axisHeightUpdated) {
                // @ts-ignore
                const widths = selected.selectAll("g.tick text").nodes().map((d: SVGTextContentElement) => d.getComputedTextLength());
                this.props.axisHeightUpdated(this.getLabelsMaxHeight(widths));
            }
        }
    }

    public render() {
        return (
            <>
                <g
                    transform={`translate(0,${this.props.height})`}
                    ref={(t) => (this.axis = t)}
                    onMouseOver={(e) => {
                        if (this.props.xAxisTicksTooltip) {
                            // @ts-ignore
                            const label = e.target.getAttribute('label');
                            this.setState({ label })
                        }
                    }}
                    onMouseOut={() => this.setState({ label: undefined })}
                />
                {this.props.xAxisTicksTooltip && this.state.label && (
                    <g>
                        <rect x={3} y={this.props.height - 20} height="18" width={textWidth(this.state.label) + 8} style={{ fill: 'white', stroke: 'grey', strokeWidth: 1, strokeOpacity: 0.9, fillOpacity: 0.9, }} />
                        <text x={7} y={this.props.height - 6} fontSize={14}>{this.state.label}</text>
                    </g>
                )}
            </>
        );
    }

    private getLabelsMaxHeight(widths: number[]): number {
        const maxWidth = max(widths);
        if (this.props.rotate) {
            // calculate right height by sin(angle) * maxWidth
            return Math.sin(Math.abs(this.props.rotate) * Math.PI / 180) * maxWidth;
        }
        return 0;
    }
}

export default XAxis;
