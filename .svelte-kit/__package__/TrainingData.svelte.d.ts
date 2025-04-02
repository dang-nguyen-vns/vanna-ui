import { SvelteComponent } from "svelte";
import type { MessageContents } from "./types";
declare const __propDef: {
    props: {
        trainingData: MessageContents | null;
        removeTrainingData: (id: string) => void;
        onTrain: (trainingData: string, trainingDataType: string) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TrainingDataProps = typeof __propDef.props;
export type TrainingDataEvents = typeof __propDef.events;
export type TrainingDataSlots = typeof __propDef.slots;
export default class TrainingData extends SvelteComponent<TrainingDataProps, TrainingDataEvents, TrainingDataSlots> {
}
export {};
