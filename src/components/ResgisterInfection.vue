<template>
  <div class="pg-register-infection custom-background custom-background">

    <div class="content">
      <div class="element-content">
        <div> 
          <h1> Reportar </h1>
        </div>
        <b-form @submit.prevent="save" class="form-register">
            <label>Select infected</label>
            <select  v-model="infection.infected" class="form-control" tabindex="12">
              <option v-for="(person, index) in people" v-bind:key="`person-${index}`" :value="person.location"> {{person.name }}
              </option>
            </select>
            <b-button type="submit" class="btn-submit" variant="primary">Reportar</b-button>
        </b-form>
 
      </div>
    </div>
  </div>
</template>

<script>
 import People from '@/services/people'

 export default {
  name: 'Register',
   computed: {
  
   },
  
   data(){
    return {
      selected:'',
      people:[],
      infection:{
        id: this.$route.params.id,
        infected: null
      },
      person:{
        id:'',
        name:'',
        age:'',
        gender:'',
        location:null,
        items: []
      }
      
     }
   },
   
   mounted(){
    People.list().then(response => {
      this.people = response.data
      console.log(response.data)
     })
  
  },
   
   methods:{
      report(person){
        this.person = person
    },
     save(){
      const infection = Object.assign({}, this.infection)
      infection.infected  = infection.infected.replace('http://zssn-backend-example.herokuapp.com/api/people/', '')
      People.createReport(infection).then(response => {
        if(response.status === 204){alert('Successfully Deported!')
          window.location = 'http://localhost:8080/96489c3f-5adc-43cd-a36e-8bd870c26c3f/register-infection'
        }
      })

    },
  
      
   },

 }

 </script>

 <style lang="scss">
   .pg-register-infection.custom-background{
    background-color: #e5d9cb;
    background-image: url(../assets/img/fullbg.png);
    background-position: left top;
    background-size: auto;
    background-repeat: repeat;
    background-attachment: fixed;
  }
   .pg-register-infection .cover-background{
    background-repeat: no-repeat!important; 
    background-attachment: fixed;
    background-position: top center!important;
    -webkit-background-size: cover!important;
    -moz-background-size: cover!important;     
    background-size: cover!important; 
  }

  .pg-register-infection .content{
    background: #000000db;
    padding: 30px;
  }
  .pg-register-infection .element-content{
    height: 500px;
    
  }
    .pg-register-infection .element-content h1{
      color: #f18c25;
      text-align: center;
      margin: 0;
      margin-bottom: 10px;
    }
   .pg-register-infection .form-register{ 
    width: 100%;
    max-width: 515px;
    margin: 0 auto;
    color: #fff;
   }
   .pg-register-infection .form-register button{

   }
     .pg-register-infection .form-register  button {
      width: 100%;
      max-width: 192px;
      color: #ffff;
      border-width: 1px;
      border-color: #fff;
      border-radius: 0px;
      font-weight: 600;
      font-size: 14px;
      background: #f10000;
      transition: color 300ms ease 0ms,background-color 300ms ease 0ms,border 300ms ease 0ms;
      margin-top: 10px;
    }
     .pg-register-infection .form-register button:hover {
      border-color: #ffffff!important;
    background-image: initial!important;
    background-color: #c13f16!important;
    }
 </style>
