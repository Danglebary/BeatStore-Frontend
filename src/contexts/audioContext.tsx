// General imports
import React, { createContext, useContext, useState } from "react";
import { BeatMainFragment } from "../generated/graphql";

type PlaylistItem = { id: number; url: string; title: string };

type ContextState = {
    playlist: Set<PlaylistItem>;
    addToPlaylist: (beats: BeatMainFragment[]) => void;
    removeFromPlaylist: (beatId: number) => void;
    currentTrack: string;
    setCurrentTrack: React.Dispatch<React.SetStateAction<string>>;
};

export const audioContext = createContext<ContextState | undefined>(undefined);

export const AudioContextProvider: React.FC = ({ children }) => {
    const [playlist, setPlaylist] = useState<Set<PlaylistItem>>(new Set());

    const [currentTrack, setCurrentTrack] = useState<string>("");

    const addToPlaylist = (beats: BeatMainFragment[]) => {
        const beatDatas = beats.map((beat) => ({
            id: beat.id,
            url: beat.s3Key,
            title: beat.title
        }));
        setPlaylist((prev) => new Set([...prev, ...beatDatas]));
    };

    const removeFromPlaylist = (beatId: number) => {
        const arr = [...playlist].filter((beat) => beat.id !== beatId);
        setPlaylist(new Set(arr));
    };

    return (
        <audioContext.Provider
            value={{
                playlist,
                addToPlaylist,
                removeFromPlaylist,
                currentTrack,
                setCurrentTrack
            }}
        >
            {children}
        </audioContext.Provider>
    );
};

export const useAudioContext = () => {
    return useContext(audioContext);
};
