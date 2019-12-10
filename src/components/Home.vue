<template>
  <div class="pg-home custom-background cover-background">    
    <div class="featured-banner">
      <img src="@/assets/img/home-banner.jpg" alt="Banner twd">
    </div>
    <div class="content">
      <div class="modal-update-map">      
        <b-form @submit.prevent="updateData" class="form-register">
          <span @click="closeModal()">X</span>
          <label>Name</label>
          <b-form-input class="input" type="text" placeholder="name" v-model="person.name"></b-form-input>
          <label>Age</label>
          <b-form-input class="input" type="number" placeholder="age" v-model="person.age"></b-form-input>
          <label>Gender</label>
          <b-form-input class="input gender" type="text" placeholder="gender" v-model="person.gender"></b-form-input>
          <label>
          <gmap-autocomplete  
            @place_changed="setPlace">
          </gmap-autocomplete>
          <button type="button" @click="addMarker">Add</button>
          </label>
          <GmapMap :center="center" :map-type-id="mapTypeId" :zoom="5" style="width:100%;  height: 200px;">
            <GmapMarker
              v-for="(item, index) in markers"
              :key="index"
              :position="item.position"
              @click="center = item.position" />       
          </GmapMap>
          <b-button type="submit" class="btn-submit" variant="primary" @click="closeModal()" >Update</b-button>
        </b-form>
      </div>
      <div class="modal-view-map"> 
        <div class="map">  
          <span @click="closeModal()">X</span>
          <h2>Last survivor location</h2>
          <GmapMap :center="center" :map-type-id="mapTypeId" :zoom="5" style="width:100%;  height: 375px;">
            <GmapMarker
              v-for="(item, index) in markers"
              :key="index"
              :position="item.position"
              @click="center = item.position" />       
          </GmapMap>
        </div>    
      </div>
        
          <span> {{this.successMessage}}</span>
         
      <h1>We are the saviors</h1>   
      <b-form @submit.prevent="list" class="find">
        <b-form-input class="input" type="text" placeholder="search survivor" v-model="search"></b-form-input>
        <b-button type="submit" class="btn-submit" >Find</b-button>
      </b-form>
      <table>
        <thead>
          <tr>
            <th class="title">Name</th>
            <th class="title">Age</th>
            <th class="title">Gender</th>
            <th class="title">view location </th>
            <th class="title">Update Location</th>
            <th class="title">Report contamination</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person of people" :key="person.id">
            <td>{{person.name}}</td>
            <td>{{person.age}}</td>
            <td>{{person.gender}}</td>
            <td v-if="person.lonlat"> <button @click="viewMap(person)" class="location view">View </button></td>
            <td v-else> <button class="location disabled">Not found </button></td>
            <td class="">
              <button @click="edit(person)" class="update">Update Local</button> 
            </td>  
            <td class="">
              <router-link :to="{name: 'registerInfection', params:{id:getId(person.location)}}"> Report </router-link>              
            </td>
          </tr>
        </tbody>
      </table>    
    </div>   
  </div>
</template>

<script>

import People from '@/services/people'

export default {
  name: 'HelloWorld',
  data(){
    return {
      errorMessage: null,
      successMessage: null,
      latitude:'',
      longitude:'',
      center: { lat: -25.395300199999998, lng: -51.468927199999996 },
      mapTypeId: "terrain",
      markers: [],
      places: [],
      currentPlace: null,
      search:'',
      selected: '',
      people:[],
      person:{
        id:'',
        name:'',
        age:'',
        gender:'',
        lonlat:'',
        items: []
      }
    }
  },
  
  mounted(){
    People.list().then(response => {
      this.people = response.data.filter(item => !item['infected?'])
      console.log(response.data)
     })
 
  },
 
  methods:{

    updateData(){
   
      People.update(this.person.location, this.person).then(response => {
        if(response.status === 200){
          this.successMessage = true
        }
        
        alert('Atualizado com sucesso!' + response.status)
        console.log(response);
      })
      
    },
    edit(person){
      this.person = person
      this.openModalUpdateMap();

    },

    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.person.lonlat = `Point(${marker.lat} ${marker.lng})`
        this.markers=[{ position: marker }];
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    viewMap(person){
      this.person = person
      const [dentro] = this.person.lonlat.match(/\(([^)]+)\)/)
      const dados = dentro.split(" ")
      const formatedLng = dados[0].replace('(','')
      const formatedlat = dados[1].replace(')','')
      this.latitude = parseFloat(formatedLng)
      this.longitude = parseFloat(formatedlat)
          
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.markers = [
        { position: { lat:  this.latitude, lng:  this.longitude} },
      ]
       this.center = {
          lat: this.latitude,
          lng: this.longitude
        };
      });
      this.openModalViewMap();
       
    },
    openModalViewMap(){
      document.querySelector('body').classList.add('shadow');
      document.querySelector('.modal-view-map').classList.add('active');  
    },
    openModalUpdateMap(){
      document.querySelector('.pg-home .modal-update-map').classList.add('active');
      document.querySelector('body').classList.add('shadow');
    },
    closeModal(){
      document.querySelector('.pg-home .modal-update-map').classList.remove('active');
      document.querySelector('body').classList.remove('shadow');
      document.querySelector('.modal-view-map').classList.remove('active');
    },

    list(){
      const search = this.search
      People.list().then(response => {
      this.people = response.data.filter(teste => teste['name'].includes(search) )
      console.log(response.data)
     })      
    
    },
   
    getId(location){
      return location.replace('http://zssn-backend-example.herokuapp.com/api/people/', '')
    }
  }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Lato|Marcellus|Open+Sans|Open+Sans+Condensed:300|Oswald|Roboto&display=swap'); 
  @import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light&display=swap');
  .pg-home{
    position: relative;
  }
  .pg-home.custom-background{
    background-color: #e5d9cb;
    background-image: url(../assets/img/fullbg.png);
    background-position: left top;
    background-size: auto;
    background-repeat: repeat;
    background-attachment: fixed;
  }
  .pg-home .cover-background{
    background-repeat: no-repeat!important; 
    background-attachment: fixed;
    background-position: top center!important;
    -webkit-background-size: cover!important;
    -moz-background-size: cover!important;     
    background-size: cover!important; 
  }
  .pg-home .content{
    background: #000000db;
    padding: 30px 20px;    

  }
   .pg-home .content h1{
     text-align: center;
     color: #f18c25;
     margin: 20px 0;
     font-family: Marcellus,sans-serif;


   }
  .pg-home .featured-banner{

  }
    .pg-home .featured-banner{

    }
      .pg-home .featured-banner img{
        display: block;
        width: 100%;
        height: auto;  
      }

  .pg-home .find{
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    padding: 20px 0;
  }
    .pg-home .find input{
      max-width: 80%; 
    }
    .pg-home .find button {
      width: 100%;
      max-width: 192px;
      color: #ffff;
      border-width: 1px;
      border-color: #fff;
      border-radius: 0px;
      font-weight: 600;
      font-size: 14px;
      background: #f18c25;
      transition: color 300ms ease 0ms,background-color 300ms ease 0ms,border 300ms ease 0ms;
    }
    .pg-home .find button:hover {
      border-color: #ffffff!important;
    background-image: initial!important;
    background-color: #c13f16!important;
    }

  .pg-home table{
    width: 100%;
    color: #fff;
  }
    .pg-home table thead{
    
    }
      .pg-home table thead tr{
      
      }
        .pg-home table thead tr th{
      
       }
        .pg-home table thead tr th.title{
          font-family: 'Shadows Into Light', cursive;
          letter-spacing: 2px;

        }
    .pg-home table tbody{

    }
      .pg-home table tbody tr{
        width: 100%;
        padding: 19px 31px;
        border: 1px solid #bbbec1;
        outline: 0;
        font-size: 15px;
        color: #fff;
        border-radius: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-family: "Open Sans",sans-serif;
        background-color: transparent;
        margin-bottom: 8px;
        -webkit-transition: border-color .2s ease-out;
        transition: border-color .2s ease-out;
      }
      .pg-home table tbody tr td{
        padding: 8px;
        font-family: Marcellus,sans-serif;
      }
        .pg-home table tbody tr td button, .pg-home table tbody tr td a{
          background: blue;
          border: none;
          padding: 3px;
          border: none;
          background: #f18c2578;
          padding: 7px 0;
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          margin: 20px auto 20px;
          position: relative;
          display: inline-block;
          width: 100%;
          max-width: 231px;
          text-align: center;
          cursor: pointer;
          text-decoration: none;
          text-transform: uppercase;
          background-color: #f18c2578;
          border-radius: 3px;
        }
        .pg-home table tbody tr td button.view{
          background: #ffc107de;
        }
        .pg-home table tbody tr td button.view:hover{
          background: #9a7a1bde;
        }
        .pg-home table tbody tr td a{
          background: red;
          font-weight: 700;
        }
        .pg-home table tbody tr td button.disabled{
          opacity: 0.4;
        }
        .pg-home table tbody tr td button.disabled:hover{
          background: #cb5405;

        }
        .pg-home table tbody tr td button:hover, .pg-home table tbody tr td a:hover{
          background: #cb5405;
          transition: all .4s;
          -webkit-transition: all .4s;
          -moz-transition: all .4s;
          -o-transition: all .4s;
        }
  .pg-home table tbody tr td.actions{ 
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    align-self: center;
  }
  .pg-home .modal-update-map, .modal-view-map{
    position: fixed;
    height: 100%;
    width: 500px;
    top: 4%;
    left: 30%;
    z-index: 1;
    display: none;
  }
  .pg-home .modal-update-map::before{
    content: '';

  }
    .pg-home .modal-update-map .form-register, .modal-view-map{
      background: #333030;
      color: #fff;
      padding: 20px;
      border: solid;
      position: relative;
      
    }
    
    .pg-home .modal-view-map {
      width: 738px;
      left: 15%;
      position: fixed;
      height: 500px;
    }
    .pg-home .modal-view-map .map h2{
      color: #f18c25;
      text-align: center;
    }
      .pg-home .modal-update-map .form-register input{
        color:black!important;
      }
      .pg-home .modal-update-map .form-register input.gender{
        margin-bottom: 10px;
      }
    .pg-home .modal-update-map .form-register span, .modal-view-map .map span{     
      cursor: pointer;
      position: absolute;
      right: 21px;
      top: 11px;
      border-radius: 100%;
      border: 1px solid;
      padding: 0 4px;
    }
      .pg-home .modal-update-map .form-register .btn{ 
        width: 40%;
        display: block;
        margin: 10px auto;
        
      }
  .open-modal{
    display: block;
  }
  .active{
    display: block!important;
  }
  body.shadow::before{
    content: '';
    height: 100vh;
    width: 100%;
    background: #0000009e;
    position: fixed;
    z-index: 1;
  }
</style>
