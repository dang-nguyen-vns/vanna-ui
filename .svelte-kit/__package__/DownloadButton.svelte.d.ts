import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        id: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DownloadButtonProps = typeof __propDef.props;
export type DownloadButtonEvents = typeof __propDef.events;
export type DownloadButtonSlots = typeof __propDef.slots;
export default class DownloadButton extends SvelteComponent<DownloadButtonProps, DownloadButtonEvents, DownloadButtonSlots> {
}
export {};
