import * as React from "react";

import { axisBottom, axisLeft, ScaleBand, ScaleLinear, select } from "d3";
import { max } from "./utils";

const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWZ00000000000000000000000000000000000');

enum LetterWidths {
    XS = 4.45,
    S = 5.39,
    M = 6.13,
    L = 7.11,
    X = 8,
    XL = 12
}

const letter = {
    a: LetterWidths.L,
    b: LetterWidths.X,
    c: LetterWidths.L,
    d: LetterWidths.X,
    e: LetterWidths.L,
    f: LetterWidths.M,
    g: LetterWidths.X,
    h: LetterWidths.X,
    i: LetterWidths.XS,
    j: LetterWidths.S,
    k: LetterWidths.X,
    l: LetterWidths.XS,
    m: LetterWidths.XL,
    n: LetterWidths.X,
    o: LetterWidths.X,
    p: LetterWidths.X,
    q: LetterWidths.X,
    r: LetterWidths.S,
    s: LetterWidths.M,
    t: LetterWidths.XS,
    u: LetterWidths.X,
    v: LetterWidths.X,
    w: LetterWidths.XL,
    x: LetterWidths.X,
    y: LetterWidths.X,
    z: LetterWidths.L,
}

const textWidth = (text: string) => Array.from(text).reduce<number>((all, current) => {
    return all + (letter[current] || 8);
}, 0);

interface XAxisProps {
    scale: ScaleBand<string> | ScaleLinear<number, number>;
    height: number;
    tickFormat?: (value: string, index: number) => string;
    rotate?: number;
    axisHeightUpdated?: (labelMaxWidth: number) => void;
    xAxisTicksTooltip?: boolean;
}

export class XAxis extends React.Component<XAxisProps, { label?: string }> {
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
            if (this.props.xAxisTicksTooltip) {
                return letters[index]
            }
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
            selected.selectAll("g.tick text").attr("label", (d) => `${d}`)
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
                    <rect x={0} y={this.props.height - 22} height="20" width={textWidth(this.state.label) + 8} style={{ fill: 'white', stroke: 'grey', strokeWidth: 1, strokeOpacity: 0.9, fillOpacity: 0.9, }} />
                    <text x={4} y={this.props.height - 8}>{this.state.label}</text>
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

interface YAxisProps {
    scale: ScaleLinear<number, any | {}>;
    axisWidthUpdated?: (labelMaxWidth: number) => void;
    tickFormat?: (value: number) => string;
}

export class YAxis extends React.Component<YAxisProps, {}> {
    // @ts-ignore
    private axis: SVGGElement | null;

    public componentDidMount() {
        this.updateAxis();
    }

    public componentDidUpdate(prevProps: YAxisProps) {
        this.updateAxis();
    }

    public updateAxis() {
        // @ts-ignore
        const axis = select(this.axis).call(axisLeft(this.props.scale).tickFormat(this.props.tickFormat || null));

        if (this.props.axisWidthUpdated) {
            // @ts-ignore
            const widths = axis.selectAll("g.tick text").nodes().map((d: SVGTextContentElement) => d.getComputedTextLength());

            this.props.axisWidthUpdated(max(widths));
        }
    }

    public render() {
        return <g ref={(t) => (this.axis = t)} />;
    }
}
