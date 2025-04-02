import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        onSubmit: (sql: string) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SqlInputProps = typeof __propDef.props;
export type SqlInputEvents = typeof __propDef.events;
export type SqlInputSlots = typeof __propDef.slots;
export default class SqlInput extends SvelteComponent<SqlInputProps, SqlInputEvents, SqlInputSlots> {
}
export {};
