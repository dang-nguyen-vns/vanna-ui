import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        df: any;
        onTrain: (trainingData: string, trainingDataType: string) => void;
        removeTrainingData: (id: string) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TrainingDataFrameProps = typeof __propDef.props;
export type TrainingDataFrameEvents = typeof __propDef.events;
export type TrainingDataFrameSlots = typeof __propDef.slots;
export default class TrainingDataFrame extends SvelteComponent<TrainingDataFrameProps, TrainingDataFrameEvents, TrainingDataFrameSlots> {
}
export {};
