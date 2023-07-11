import axios from 'axios';
import {config} from '../config/config'

export default class googleForm {
    send = async (username: string, data: any) => {
        const URL = `https://docs.google.com/forms/d/e/${config.form_id}/formResponse?submit=Submit?usp=pp_url`
        const formData = new FormData()
        formData.append('entry.72000913',  username),
        formData.append('entry.457476898', JSON.stringify(data))
        try {
            await axios.post(URL, formData);
        }
        catch (e) {
            console.log(e)
        }
    }
}
