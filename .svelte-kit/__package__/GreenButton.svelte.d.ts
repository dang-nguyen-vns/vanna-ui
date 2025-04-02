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
export type GreenButtonProps = typeof __propDef.props;
export type GreenButtonEvents = typeof __propDef.events;
export type GreenButtonSlots = typeof __propDef.slots;
export default class GreenButton extends SvelteComponent<GreenButtonProps, GreenButtonEvents, GreenButtonSlots> {
}
export {};
