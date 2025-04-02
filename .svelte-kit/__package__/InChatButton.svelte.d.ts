import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        message: string;
        onSubmit: (message: string) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type InChatButtonProps = typeof __propDef.props;
export type InChatButtonEvents = typeof __propDef.events;
export type InChatButtonSlots = typeof __propDef.slots;
export default class InChatButton extends SvelteComponent<InChatButtonProps, InChatButtonEvents, InChatButtonSlots> {
}
export {};
