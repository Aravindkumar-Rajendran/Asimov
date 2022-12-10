import "./home.scss";
import MainBtn from "../../components/mainBtn";
const Home = () => {
    return (
        <div className="home-wrapper">
            <div className="welcome-card">
                <p className="name"> Hi, Aravind </p>
                <p className="greetings">Have  great day!</p>
            </div>
            <MainBtn label="Random Vocabulary"/>
            <MainBtn label="Grammar Builder"/>
            <MainBtn label="Dialogues"/>
            <MainBtn label="Free Flow Conversations"/>
        </div>
    )
}
export default Home