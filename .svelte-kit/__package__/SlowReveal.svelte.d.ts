import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        text: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SlowRevealProps = typeof __propDef.props;
export type SlowRevealEvents = typeof __propDef.events;
export type SlowRevealSlots = typeof __propDef.slots;
export default class SlowReveal extends SvelteComponent<SlowRevealProps, SlowRevealEvents, SlowRevealSlots> {
}
export {};
