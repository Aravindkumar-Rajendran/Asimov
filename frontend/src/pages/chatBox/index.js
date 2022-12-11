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
    }else if (params.id == 'grammar_builder'){
      setLabel('Grammar Builder')
    }else if(params.id == 'dialogues'){
      setLabel('Dialogues')
    }else if(params.id == 'free_flow_conversations'){
      setLabel('Conversations')
    }
  }, [])
  return (
    <div className="random-vocabulary-wrapper">
      <span style={{ fontSize: 50, height: 26, position: 'relative', zIndex: 4, fontWeight:900 }} onClick={() => navigate("/")}>←</span>
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