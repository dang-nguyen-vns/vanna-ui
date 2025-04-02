import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        id: string;
        df: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DataFrameProps = typeof __propDef.props;
export type DataFrameEvents = typeof __propDef.events;
export type DataFrameSlots = typeof __propDef.slots;
export default class DataFrame extends SvelteComponent<DataFrameProps, DataFrameEvents, DataFrameSlots> {
}
export {};
