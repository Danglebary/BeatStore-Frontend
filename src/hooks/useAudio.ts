// General imports
import { useEffect, useRef, useState } from "react";
// Type imports
import { BeatsResponseSimpleFragment } from "../generated/graphql";
// Util imports
import { floatToTime } from "../utils/floatToTime";

interface UseAudioProps {
    beats: BeatsResponseSimpleFragment["beats"];
}

export const useAudio = ({ beats }: UseAudioProps) => {
    // playlist of all tracks on current page
    const [playlist, _] = useState<BeatsResponseSimpleFragment["beats"]>(beats);

    // current track in play position
    const [currentTrack, setCurrentTrack] = useState<number>(0);

    const [metaData, setMetadata] = useState({ duration: "", name: "" });

    // current track playing or not?
    const [isPlaying, setIsPlaying] = useState(false);

    // audio component ref
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleMetadata = () => {
        setMetadata({
            duration: floatToTime(audioRef.current!.duration),
            name: beats[currentTrack].title
        });
    };

    useEffect(() => {
        setTimeout(() => {
            handleMetadata();
        }, 500);
    }, [currentTrack]);

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
        if (audioRef.current) {
            if (isPlaying) {
                setIsPlaying(false);
            }
            if (audioRef.current.currentTime > 0) {
                audioRef.current.currentTime = 0;
            } else {
                setCurrentTrack((prev) => {
                    return currentTrack > 0 ? prev - 1 : playlist.length - 1;
                });
            }
            setTimeout(() => {
                setIsPlaying(true);
            }, 50);
        }
    };

    // play next track function
    const skipNextTrack = () => {
        if (isPlaying) {
            setIsPlaying(false);
        }
        setCurrentTrack((prev) => {
            return currentTrack < playlist.length - 1 ? prev + 1 : 0;
        });

        setTimeout(() => {
            setIsPlaying(true);
        }, 50);
    };

    const replayTrack = () => {
        if (isPlaying) {
            setIsPlaying(false);
        }
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
        setTimeout(() => {
            setIsPlaying(true);
        }, 100);
    };

    const setCurrentTime = (val: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = val;
        }
    };

    const setPlaybackSpeed = (val: number) => {
        if (val < 0.25 || val > 2.0) {
            return;
        }
        if (audioRef.current) {
            audioRef.current.playbackRate = val;
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
        replayTrack,
        setCurrentTime,
        setPlaybackSpeed,
        audioRef,
        metaData
    };
};
