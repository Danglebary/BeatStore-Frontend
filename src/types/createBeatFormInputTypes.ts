// Custom imports
import { MusicalKeys } from "./musicalKeysTypes";

export type CreateBeatFormDataType = {
    title: string;
    genre: string;
    bpm: number;
    key: MusicalKeys;
    tags: string[];
};
