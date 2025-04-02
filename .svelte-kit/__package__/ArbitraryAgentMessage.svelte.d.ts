import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        endpoint: string;
        addMessage: (msg: string) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: undefined;
    bindings?: undefined;
};
export type ArbitraryAgentMessageProps = typeof __propDef.props;
export type ArbitraryAgentMessageEvents = typeof __propDef.events;
export type ArbitraryAgentMessageSlots = typeof __propDef.slots;
export default class ArbitraryAgentMessage extends SvelteComponent<ArbitraryAgentMessageProps, ArbitraryAgentMessageEvents, ArbitraryAgentMessageSlots> {
}
export {};
