import { useState } from "react";

export default function useComponentVisible(initialIsVisible) {
    const [ isOpen, setIsOpen ] = useState(initialIsVisible);

    const handleToggleBar = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }

    return { isOpen, handleToggleBar };
}