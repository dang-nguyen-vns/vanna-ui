import { SvelteComponent } from "svelte";
import type { QuestionLink } from "./types";
declare const __propDef: {
    props: {
        getTrainingData: () => void;
        newQuestionPage: () => void;
        loadQuestionPage: (id: string) => void;
        questionHistory: QuestionLink[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SidebarProps = typeof __propDef.props;
export type SidebarEvents = typeof __propDef.events;
export type SidebarSlots = typeof __propDef.slots;
export default class Sidebar extends SvelteComponent<SidebarProps, SidebarEvents, SidebarSlots> {
}
export {};
