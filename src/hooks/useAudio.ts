// General imports
import { useEffect, useRef, useState } from "react";
import { BeatsResponseSimpleFragment } from "../generated/graphql";

interface UseAudioProps {
    beats: BeatsResponseSimpleFragment["beats"];
}

export const useAudio = ({ beats }: UseAudioProps) => {
    // playlist of all tracks on current page
    const [playlist, _] = useState<BeatsResponseSimpleFragment["beats"]>(beats);

    useEffect(() => {
        console.log(playlist);
    }, [playlist]);

    // current track in play position
    const [currentTrack, setCurrentTrack] = useState<number>(0);

    const [metaData, setMetadata] = useState({ duration: "" });

    // current track playing or not?
    const [isPlaying, setIsPlaying] = useState(false);

    // audio component ref
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const floatToTime = (num: number) => {
        let mins = Math.floor(num / 60);
        let secs = Math.round(num % 60);
        let secsStr = secs.toString();
        if (secsStr.length < 2) {
            secsStr = "0" + secsStr;
        }
        return [mins, secsStr].join(":");
    };

    const handleMetadata = () => {
        setMetadata({ duration: floatToTime(audioRef.current!.duration) });
    };

    useEffect(() => {
        if (audioRef.current?.duration !== NaN) {
            handleMetadata();
        }
    }, [audioRef, currentTrack]);

    // toggle current track playing/pausing
    const togglePlaying = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (audioRef.current) {
            if (!isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
    }, [isPlaying]);

    // play prev track function
    const skipPrevTrack = () => {
        if (isPlaying) {
            togglePlaying();
        }
        setCurrentTrack((prev) => {
            return currentTrack > 0 ? prev - 1 : playlist.length - 1;
        });
        if (!isPlaying) {
            togglePlaying();
        }
    };

    // play next track function
    const skipNextTrack = () => {
        if (isPlaying) {
            togglePlaying();
        }
        setCurrentTrack((prev) => {
            return currentTrack < playlist.length - 1 ? prev + 1 : 0;
        });
        if (!isPlaying) {
            togglePlaying();
        }
    };

    // returning play/pause/next/last, audioRef
    return {
        handleMetadata,
        currentTrack,
        isPlaying,
        togglePlaying,
        skipPrevTrack,
        skipNextTrack,
        audioRef,
        metaData
    };
};
