import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext<{
  prevPrompts: any[];
  setPrevPrompts: (data: string[]) => void;
  onSent: (prompt?: string) => void;
  recentPrompt: string;
  setRecentPrompt: (data: string) => void;
  showResult: boolean;
  loading: boolean;
  resultData: string;
  input: string;
  setInput: (data: string) => void;
  newChat: () => void;
}>({
  prevPrompts: [],
  setPrevPrompts: () => {},
  onSent: () => {},
  recentPrompt: "",
  setRecentPrompt: () => {},
  showResult: false,
  loading: false,
  resultData: "",
  input: "",
  setInput: () => {},
  newChat: () => {},
});

const ContextProvider = (props: any) => {
  const [prevPrompts, setPrevPrompts] = useState<any[]>([]);
  const [recentPrompt, setRecentPrompt] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [resultData, setResultData] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const delayPara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt?: string) => {
    setShowResult(true);
    setLoading(true);
    setResultData("");
    let response = "";

    const toProcessPrompt = prompt || input;

    setRecentPrompt(toProcessPrompt);
    response = await run(toProcessPrompt);

    if (!prompt) setPrevPrompts((prev) => [...prev, input]);

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i += 1) {
      if (i % 2) {
        newResponse += `<b>${responseArray[i]}</b>`;
      } else newResponse += responseArray[i];
    }
    newResponse = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    resultData,
    newChat,
    input,
    loading,
    setInput,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
