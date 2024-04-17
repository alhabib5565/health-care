import { useEffect, useState } from "react";

type TDebouncedProps = {
    searchTerm: string,
    dealy: number
}

const UseDebounced = ({ searchTerm, dealy }: TDebouncedProps) => {
    const [debounced, setDebounced] = useState<string>(searchTerm)

    useEffect(() => {
        const handleDebounced = setTimeout(() => {
            setDebounced(searchTerm)
        }, (dealy));

        return () => {
            clearTimeout(handleDebounced)
        }

    }, [searchTerm, dealy])

    return debounced
};

export default UseDebounced;