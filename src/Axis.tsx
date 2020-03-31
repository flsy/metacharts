import * as React from "react";

import { axisBottom, axisLeft, ScaleBand, ScaleLinear, select } from "d3";
import { max } from "./utils";

interface XAxisProps {
    scale: ScaleBand<string>;
    height: number;
    tickFormat?: (value: string, index: number) => string;
    rotate?: number;
    axisHeightUpdated?: (labelMaxWidth: number) => void;
}

export class XAxis extends React.Component<XAxisProps, {}> {
    // @ts-ignore
    private axis: SVGGElement | null;

    public componentDidMount() {
        this.updateAxis();
    }

    public componentDidUpdate(prevProps: XAxisProps) {
        this.updateAxis();
    }

    public updateAxis() {
        // @ts-ignore
        const selected = select(this.axis).call(axisBottom(this.props.scale).tickSize(0).tickPadding(6).tickFormat(this.props.tickFormat));

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
            <g transform={`translate(0,${this.props.height})`} ref={(t) => (this.axis = t)} />
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
