import { useState } from 'react';

export default function useValidateRegex(initial, regex){
    const [string, setString] = useState(initial)
    const [valid, setValid] = useState(false)
    const validate = (data) => {
        setString(data)
        if(data.match(regex)) setValid(true)
        else setValid(false)
    }
    return [string, validate, valid]
}

export function useValidateListRegex(initial, regex){
    const [string, setString] = useState(initial)
    let [strength, setStrength] = useState(0);
    const validate = (data) => {
        let strengthTemp = 0
        setString(data)
        for(let test in regex)
        if(data.match(regex[test])) strengthTemp += 1
        setStrength(strengthTemp)
    }
    return [string, validate, strength]
}