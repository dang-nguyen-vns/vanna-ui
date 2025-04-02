/** @typedef {typeof __propDef.props}  UserMessageProps */
/** @typedef {typeof __propDef.events}  UserMessageEvents */
/** @typedef {typeof __propDef.slots}  UserMessageSlots */
export default class UserMessage extends SvelteComponent<{
    message: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type UserMessageProps = typeof __propDef.props;
export type UserMessageEvents = typeof __propDef.events;
export type UserMessageSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        message: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: undefined;
    bindings?: undefined;
};
export {};
