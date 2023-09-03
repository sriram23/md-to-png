import { useState, useRef } from "react";
import "./App.css";
import { toPng } from "html-to-image";
import download from 'downloadjs';

function App() {
  const [handle, setHandle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const resultRef = useRef(null);
  const downloadImage = (e) => {
    e.preventDefault();
    const divToCapture = resultRef.current;
    toPng(divToCapture).then((url) => {
      download(url, 'tweet-better.png')
    }).catch((error) => {
      console.error('Error capturing div as image:', error);
    })

  };
  return (
    <>
      <div className="main-container">
        <form className="main-form">
          <input
            placeholder="handle"
            onChange={(e) => setHandle(e.target.value)}
          ></input>
          <input
            type="file"
            onChangeCapture={(e) => setImage(e.target.files)}
            accept="image/*"
            multiple={false}
          ></input>
          <textarea
            placeholder="Your content goes here"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button onClick={(e) => downloadImage(e)}>Download</button>
        </form>
        <div className="result-container" ref={resultRef}>
          <div className="result-outer-area">
            <div className="result-area">
              <div className="profile-container">
                {image && (
                  <figure className="profile-image">
                    <img
                      src={URL.createObjectURL(image[0])}
                      alt="profile picture"
                    />
                  </figure>
                )}
                <h2>{handle}</h2>
              </div>
              <div className="content-container">{content}</div>
            </div>
          </div>
          <div className="creator-section">Powered by Tweet Better!</div>
        </div>
      </div>
    </>
  );
}

export default App;
