import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        onDismiss: () => void;
        onTrain: (trainingData: string, trainingDataType: string) => void;
        selectedTrainingDataType?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type NewTrainingDataProps = typeof __propDef.props;
export type NewTrainingDataEvents = typeof __propDef.events;
export type NewTrainingDataSlots = typeof __propDef.slots;
export default class NewTrainingData extends SvelteComponent<NewTrainingDataProps, NewTrainingDataEvents, NewTrainingDataSlots> {
}
export {};
