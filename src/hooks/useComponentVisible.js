import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(initialIsVisible) {
    const [ isComponentVisible, setIsComponentVisible ] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickInside = () => {
        setIsComponentVisible(!isComponentVisible);
    }

    const handleClickOutside = (e) => {
        if(ref.current && !ref.current.contains(e.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [ref])

    return { ref, isComponentVisible, handleClickInside, setIsComponentVisible };
}