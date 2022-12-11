import a from "./apihelper"
const apihelper = new a();
const base_address = process.env.REACT_APP_SERVER_URL;
console.log("BASE ADDRESS READ FROM ENV", base_address)
class asimoService {
    getRandomWord(){
        const url = base_address + "/random-word";
        console.log('reading the url-',url)
        return apihelper.get(url)
    }
    postGrammarBuilding(text){
        const url = base_address + "/grammar";
        return apihelper.post(url,{
            user_id:Math.round(Math.random()*1000000),
            text
        })
    }
    getDialogues(){
        const url = base_address + "/dialogue";
        return apihelper.get(url)
    }
}
export default asimoService;