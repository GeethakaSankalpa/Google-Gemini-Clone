import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    

    const[input, setInput] = useState("");
    const[recentPrompt, setRecentPrompt] = useState("");
    const[previousPrompt, setPreviousPrompt] = useState([]);
    const[displayResult, setDisplayResult] = useState(false);
    const[loading, setLoading] = useState(false);
    const[resultData, setResultData] = useState("");
    

    const onSent = async (prompt)=>{

        setResultData("")   // remove previous response
        setLoading(true)
        setDisplayResult(true)
        setRecentPrompt(input)
        const response = await run(input)
        setResultData(response)
        setLoading(false)
        setInput("")    // reset input
    }

    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        displayResult,
        loading,
        resultData,
        input,
        setInput,
        

    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider