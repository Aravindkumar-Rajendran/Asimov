import a from "./apihelper"
const apihelper = new a();
const base_address = process.env.REACT_APP_SERVER_URL;
console.log("BASE ADDRESS READ FROM ENV", base_address)
class exampleService {
    postSample({}){
        const url = base_address + "ext";
        return apihelper.post(url,{})
    }
}
export default exampleService;