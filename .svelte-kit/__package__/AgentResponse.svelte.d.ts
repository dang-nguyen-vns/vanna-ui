import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type AgentResponseProps = typeof __propDef.props;
export type AgentResponseEvents = typeof __propDef.events;
export type AgentResponseSlots = typeof __propDef.slots;
export default class AgentResponse extends SvelteComponent<AgentResponseProps, AgentResponseEvents, AgentResponseSlots> {
}
export {};
