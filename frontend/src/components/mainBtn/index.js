import "./mainBtn.scss"
const MainBtn = ({ label = "btn", onClick = () => { } }) => {
    return (
        <button onClick={onClick}>
            <p>{label}</p>
        </button>
    )
}
export default MainBtn