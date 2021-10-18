export const useFloatToTime = () => {
    const floatToTime = (num: number) => {
        let mins = Math.floor(num / 60);
        let secs = Math.round(num % 60);
        let secsStr = secs.toString();
        if (secsStr.length < 2) {
            secsStr = "0" + secsStr;
        }
        return [mins, secsStr].join(":");
    };

    return { floatToTime };
};
