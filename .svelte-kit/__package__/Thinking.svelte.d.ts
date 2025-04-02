import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ThinkingProps = typeof __propDef.props;
export type ThinkingEvents = typeof __propDef.events;
export type ThinkingSlots = typeof __propDef.slots;
export default class Thinking extends SvelteComponent<ThinkingProps, ThinkingEvents, ThinkingSlots> {
}
export {};
