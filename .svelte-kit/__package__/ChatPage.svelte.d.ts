import { SvelteComponent } from "svelte";
import type { MessageContents } from "./types";
declare const __propDef: {
    props: {
        suggestedQuestions?: MessageContents | null | undefined;
        messageLog?: MessageContents[] | undefined;
        newQuestion: (question: string) => void;
        rerunSql: (id: string) => void;
        clearMessages: () => void;
        onUpdateSql: (sql: string) => void;
        question_asked: boolean;
        marked_correct: boolean | null;
        thinking: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ChatPageProps = typeof __propDef.props;
export type ChatPageEvents = typeof __propDef.events;
export type ChatPageSlots = typeof __propDef.slots;
export default class ChatPage extends SvelteComponent<ChatPageProps, ChatPageEvents, ChatPageSlots> {
}
export {};
