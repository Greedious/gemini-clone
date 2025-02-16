import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/context";

const main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    setRecentPrompt,
  } = useContext(Context);

  const loadPrompt = async (prompt: string) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user_icon" />
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user_icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini_icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="greet">
              <p>
                <span>Hello, Dev!</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                onClick={() =>
                  loadPrompt("Suggest a beautiful place to go for a trip.")
                }
                className="card"
              >
                <p>Suggest a beautiful place to go for a trip.</p>
                <img src={assets.compass_icon} alt="compass_icon" />
              </div>

              <div
                onClick={() =>
                  loadPrompt(
                    "Briefly summarize me how to learn a new language in shortperiod."
                  )
                }
                className="card"
              >
                <p>
                  Briefly summarize me how to learn a new language in short
                  period.
                </p>
                <img src={assets.bulb_icon} alt="compass_icon" />
              </div>

              <div
                onClick={() => "What is the largest city in Germany."}
                className="card"
              >
                <p>What is the largest city in Germany.</p>
                <img src={assets.message_icon} alt="compass_icon" />
              </div>

              <div
                onClick={() =>
                  "Give me a couple of tips, How to be a good Software Engineer."
                }
                className="card"
              >
                <p>
                  Give me a couple of tips, How to be a good Software Engineer.
                </p>
                <img src={assets.code_icon} alt="compass_icon" />
              </div>
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>

          <p className="bottom-info">
            Note that gemini may not provide accurate info, so make sure you
            don't rely on it as a primary source of info
          </p>
        </div>
      </div>
    </div>
  );
};

export default main;
