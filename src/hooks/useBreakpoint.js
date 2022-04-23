import {useState, useEffect} from 'react'

function useBreakpoint(breakpoint) {

    const [isMatch, setMatch] = useState(false);
   
    window.addEventListener('resize', () => {

        if (window.innerWidth <= breakpoint) {
            setMatch(true)
        } else {
            setMatch(false)
        }
    });

    if (window.innerWidth <= breakpoint) {
        return true;
    }

    return isMatch;
}

export default useBreakpoint