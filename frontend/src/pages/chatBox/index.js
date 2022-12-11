import "./random_vocabulary.scss";
import AudioRecorder from "../../components/audioRecorder";
import ChatView from "../../components/chatView";
import { useNavigate } from "react-router-dom";
const ChatBox = ({Label}) => {
  const navigate = useNavigate()
    return (
      <div className="random-vocabulary-wrapper">
        <span style={{fontSize:50,height:26,position:'relative',zIndex:4}} onClick={()=>navigate("/")}>←</span>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        {Label}
         <div className="cv-wrapper">
         <ChatView />
         </div>
         <div className="ar-wrapper">
         <AudioRecorder/>
         </div>
         
      </div>
    )
}
export default ChatBox;