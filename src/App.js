import "./App.css";
import React, {useState } from "react";
import { marked } from "marked";
import { useLocalStorage } from "./Hooks/useLocalstorage";
import basic_syntax from "./basic-syntax.json";
const App = () => {
  const [data, setData] = useLocalStorage();
  const [code, setCode] = useState(data);
  const [compiled, setCompiled] = useState(marked.parse(data));
  const [section, setSection] = useState("MarkDown");
  const openMD = () => {
    setSection("MarkDown");
  };

  const openPreview = () => {
    setSection("Preview");
  };
  const openDecs = () => {
    setSection("Decs");
  };

  const handleChange = (e) => {
    setData(e.target.value);
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button
            onClick={openMD}
            className={`${section === "MarkDown" && "btn"}`}
          >
            MarkDown
          </button>
          <button
            onClick={openPreview}
            className={`${section === "Preview" && "btn"}`}
          >
            Preview
          </button>
          <button
            onClick={openDecs}
            className={`${section === "Decs" && "btn"}`}
          >
            Decs
          </button>
        </div>
        {section === "MarkDown" ? (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        ) : section === "Preview" ? (
          <div>
            <textarea value={compiled} />
          </div>
        ) : (
          <div className="Decs" style={{ textAlign: "start" }}>
            <h2 className="decs-title">Decs</h2>
            {basic_syntax?.basic_syntax?.map((item, index) => (
              <div className="decs-item" key={index}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h2 style={{ marginTop: "10px", marginBottom: "5px" }}>
                  Examples :{" "}
                </h2>
                <ol className="examples-decs">
                  {item.examples.map((example, index) => (
                    <li className="example " key={index}>
                      <h3>MarkDown : {example.markdown} </h3>
                      <h3>Preview : {example.html} </h3>
                    </li>
                  ))}
                </ol>
                {item.additional_examples.length !== 0 && (
                  <>
                    <h2 style={{ marginTop: "10px", marginBottom: "5px" }}>
                      Additional Examples :{" "}
                    </h2>
                    <ol className="examples-decs">
                      {item.additional_examples.map((example, index) => (
                        <li className="example " key={index}>
                          <h2>{example.name} </h2>
                          <p> {example.description} </p>
                          <h4>MarkDown : {example.markdown} </h4>
                          <h4 style={{ wordWrap: "break-word" }}>
                            Preview : {example.html}{" "}
                          </h4>
                          <br />
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
