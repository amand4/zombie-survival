import {http} from './config'

export default {
    
    list:() => {
        return http.get('people')
    },

    save:(person) =>{
        return http.post('people', person)
    },

    update:(id, person) =>{
        return http.patch(id + ".json", person)
    }
}