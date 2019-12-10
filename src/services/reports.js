import {http} from './config'

export default {
    
   
    reportInfected:() => {
        return http.get('report/infected.json')
    },

    reportNoInfected:() => {
        return http.get('report/non_infected.json')
    },

    reportPeopleInventory:() => {
        return http.get('report/people_inventory.json')
    },
    reportInfectedPoints:() => {
        return http.get('report/infected_points.json')
    },

}
