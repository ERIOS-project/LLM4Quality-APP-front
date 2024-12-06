import { Button } from "@mui/material";
import API from "../utils/api";

export default function AppelApi(){

    async function appelApi(){
        const response = API.get('/');
    }

    return(
        <div>
            <Button onClick={()=>{appelApi();}} variant="contained" color="primary">
                Appel API
            </Button>
        </div>
    )
}