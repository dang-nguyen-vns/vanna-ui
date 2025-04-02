import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        message: string;
        buttonLabel: string;
        onClose: () => void;
        onConfirm: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ConfirmDeleteProps = typeof __propDef.props;
export type ConfirmDeleteEvents = typeof __propDef.events;
export type ConfirmDeleteSlots = typeof __propDef.slots;
export default class ConfirmDelete extends SvelteComponent<ConfirmDeleteProps, ConfirmDeleteEvents, ConfirmDeleteSlots> {
}
export {};
