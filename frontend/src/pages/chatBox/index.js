import "./random_vocabulary.scss";
import AudioRecorder from "../../components/audioRecorder";
import ChatView from "../../components/chatView";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const ChatBox = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (params.id == 'random_vocabulary') {
      setLabel('Random Vocabulary')
    }
  }, [])
  return (
    <div className="random-vocabulary-wrapper">
      <span style={{ fontSize: 50, height: 26, position: 'relative', zIndex: 4 }} onClick={() => navigate("/")}>←</span>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      {label}
      <div className="cv-wrapper">
        <ChatView />
      </div>
      {
        params.id == 'something' &&
        <div className="ar-wrapper">
          <AudioRecorder />
        </div>
      }

    </div>
  )
}
export default ChatBox;