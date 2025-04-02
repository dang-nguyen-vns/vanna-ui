import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        onSubmit: (message: string) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TextInputProps = typeof __propDef.props;
export type TextInputEvents = typeof __propDef.events;
export type TextInputSlots = typeof __propDef.slots;
export default class TextInput extends SvelteComponent<TextInputProps, TextInputEvents, TextInputSlots> {
}
export {};
