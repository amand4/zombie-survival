<template>
  <div class="pg-reports custom-background">

    <div class="featured-banner">
      <img src="@/assets/img/home-banner.jpg" alt="">
    </div>
    <h1 class="title">Reports Survivors</h1>
    <div class="content">
      <div>

        <b-row>
          <b-col>
              <div v-for="reportInfected of reportsInfected" :key="reportInfected.id">
                <h2>{{reportInfected.description }}</h2>
              
                <pie-chart :data="[[reportInfected.description, infected = convert(reportInfected.average_infected)], ['Total People', (convert(reportInfected.average_infected) - 100)]]"></pie-chart>
              
              </div>
            
              <div v-for="reportNoInfected of reportsNoInfected" :key="reportNoInfected.id">
                <h2>{{reportNoInfected.description }}</h2>
                <pie-chart :data="[[reportNoInfected.description, survivors = convert(reportNoInfected.average_healthy)], [ 'People Infected', (convert(reportNoInfected.average_healthy)- 100)]]"></pie-chart>
            </div>
            <div v-for="reportInventory of reportsInventory" :key="reportInventory.id">
                <h2>Average of the quantity of items per person</h2>
                <span>Total: {{reportInventory.average_items_quantity_per_person}}</span>
                <span>Non infected: {{reportInventory.average_items_quantity_per_healthy_person}}</span>
            </div>
              <div v-for="reportPoints of reportsPoints" :key="reportPoints.id">
                <h2>{{reportPoints.description }}</h2>
                <span> Total: {{reportPoints.total_points_lost}}  </span>
              </div> 
          </b-col>
        </b-row>  
      </div>  
    </div>     
  </div>
</template>

<script>

import Reports from '@/services/reports'
import People from '@/services/people'


export default {
  name: 'Reports',
 
  data(){
    return {
      infected: '',
      survivors: 1,
      total:1,
      control: '',
      peopleSurvivors:[],
      peopleInfected:[],
      peopleTotal:[],
      quantitySurvivors:'',
      quantityInfected:'',
      quantityTotal:'',
      reportsInfected:[],
      reportsNoInfected:[],
      reportsInventory:[],
      reportsPoints:[],
      report:{
        description:'',
        average_infected:'',
        average_healthy:'',
        average_items_quantity_per_person:'',
        average_items_quantity_per_healthy_person:'',
        total_points_lost:''
        
      },
      reportNoInfected:{
        description:'',
        average_infected:'',
        average_healthy:'',
        average_items_quantity_per_person:'',
        average_items_quantity_per_healthy_person:'',
        total_points_lost:''
        
      },
      reportInventory:{
        description:'',
        average_infected:'',
        average_healthy:'',
        average_items_quantity_per_person:'',
        average_items_quantity_per_healthy_person:'',
        total_points_lost:''
        
      },
      reportPoints:{
        description:'',
        average_infected:'',
        average_healthy:'',
        average_items_quantity_per_person:'',
        average_items_quantity_per_healthy_person:'',
        total_points_lost:''
        
      }
    }
  },
   
  mounted(){    
    People.list().then(response => {
        this.peopleSurvivors = response.data.filter(item => !item['infected?'])
        this.peopleInfected = response.data.filter(item => item['infected?'])
        this.peopleTotal = response.data.filter(item => {
        console.log(item)
        })
        this.peopleTotal  = response.data.length
        this.quantitySurvivors = this.peopleSurvivors.length
        this.quantityInfected = this.peopleInfected.length        

      }),
      Reports.reportInfected().then(response => {
        this.reportsInfected = response.data
        console.log(response.data)
      }),
      Reports.reportNoInfected().then(response => {
        this.reportsNoInfected = response.data
        console.log(response.data)
      }),
      Reports.reportPeopleInventory().then(response => {
        this.reportsInventory = response.data
        console.log(response.data)
      }),
      Reports.reportInfectedPoints().then(response => {
        this.reportsPoints = response.data
        console.log(response.data)
      })
    
  },

  methods:{
    
    convert(media){
      const convertString = parseFloat(media)
      const percentage = convertString * 100
      const totalPercentage =  Math.round(percentage)
      const result = this.calculate(totalPercentage);
      return result 
    },
    calculate(totalPercentage){
     const result = (this.peopleTotal / totalPercentage)
     return result
    }    
   }
}

</script>
<style>
 .pg-reports{

  }
  .pg-reports.custom-background{
    background-color: #2d2c2a;
    background-image: url(../assets/img/fullbg.png);
    background-position: left top;
    background-size: auto;
    background-repeat: repeat;
    background-attachment: fixed;
  }
  .pg-reports .cover-background{
    background-repeat: no-repeat!important; 
    background-attachment: fixed;
    background-position: top center!important;
    -webkit-background-size: cover!important;
    -moz-background-size: cover!important;     
    background-size: cover!important; 
  }
  .pg-reports .content{
    background: #000;
    padding: 0 20px;
  }
  .pg-reports .featured-banner{

  }
 
    
      .pg-reports .featured-banner img{
        display: block;
        width: 100%;
        height: auto;        
      }
    .pg-reports .title{
      background: black;
      text-align: center;
      color: #fff;
      margin: 0;
      font-size: 25px;
      padding: 20px 0;
      font-family: Marcellus,sans-serif;
    }
    .pg-reports h2{
      color: #f18c25;
      margin: 20px 10px;
      font-family: Marcellus,sans-serif;
      font-size: 20px;
    }
    .pg-reports span{
      display: block;
      color: #fff;
      font-weight: 600;
      font-size: 16px;
      margin: 0 10px;
    }
</style>
