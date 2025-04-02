import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        fig: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PlotlyProps = typeof __propDef.props;
export type PlotlyEvents = typeof __propDef.events;
export type PlotlySlots = typeof __propDef.slots;
export default class Plotly extends SvelteComponent<PlotlyProps, PlotlyEvents, PlotlySlots> {
}
export {};
