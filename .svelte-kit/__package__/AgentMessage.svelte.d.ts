import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        endpoint: string;
        question: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type AgentMessageProps = typeof __propDef.props;
export type AgentMessageEvents = typeof __propDef.events;
export type AgentMessageSlots = typeof __propDef.slots;
export default class AgentMessage extends SvelteComponent<AgentMessageProps, AgentMessageEvents, AgentMessageSlots> {
}
export {};
