import {http} from './config'

export default {
    
    list:() => {
        return http.get('people')
    },
    reports:() => {
        return http.get('report/infected.json')
    },

    save:(person) =>{
        return http.post('people', person)
    },

    update:(id, person) =>{
        alert(id, person);

        return http.patch(id + ".json", person)
    },
    
    createReport:(infection) =>{
        return http.post('people/'+ infection.id + "/report_infection.json", infection)
    }
}