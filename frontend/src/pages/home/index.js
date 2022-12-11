import "./home.scss";
import MainBtn from "../../components/mainBtn";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const goTo = (page) => {
        navigate(page)
    }
    return (
        <div className="home-wrapper">
            <div className="welcome-card">
                <p className="name"> Hi, There </p>
                <p className="greetings">Have a great day!</p>
            </div>
            <MainBtn label="Random Vocabulary" onClick={()=>goTo('random_vocabulary')}/>
            <MainBtn label="Grammar Builder" onClick={()=>goTo('grammar_builder')}/>
            <MainBtn label="Dialogues" onClick={()=>goTo('dialogues')}/>
            <MainBtn label="Free Flow Conversations" onClick={()=>goTo('free_flow_conversations')}/>
        </div>
    )
}
export default Home