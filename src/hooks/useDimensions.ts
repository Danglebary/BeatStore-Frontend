// General imports
import { useState, useEffect } from "react";

const getWindowDim = () => {
    if (typeof window === "undefined") {
        return {
            width: 0,
            height: 0
        };
    }
    const { innerWidth: width, innerHeight: height } = window;

    return {
        width,
        height
    };
};

export const useDimensions = () => {
    const [windowDims, setWindowDims] = useState(getWindowDim());

    useEffect(() => {
        const handleResize = () => {
            setWindowDims(getWindowDim());
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [type, setType] = useState<"mobile" | "desktop">("desktop");

    useEffect(() => {
        if (windowDims.width <= 600) {
            if (type === "desktop") {
                setType("mobile");
            }
        } else {
            if (type === "mobile") {
                setType("desktop");
            }
        }
    }, [windowDims]);

    return type;
};
