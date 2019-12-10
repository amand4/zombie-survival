<template>
  <div class="pg-register custom-background">
    <div class="container">
      <div class="element-content">     
        <div> 
          <h1> Register </h1>
        </div>
        <b-form @submit.prevent="save" class="form-register">
            <b-form-input class="input" type="text" placeholder="name" v-model="person.name"></b-form-input>
            <b-form-input class="input" type="number" placeholder="age" v-model="person.age"></b-form-input>
            <b-form-radio  type="radio" value="F" v-model="person.gender"> Female </b-form-radio>
            <b-form-radio  type="radio" value="M" v-model="person.gender"> Male </b-form-radio>
            <div>
              <h2>Search and add a pin</h2>
              <label>
                <gmap-autocomplete
                  @place_changed="setPlace">
                </gmap-autocomplete>
                <button type="button" @click="addMarker">Add</button>
              </label>
              <br/>

            </div>
            <br>
            <gmap-map
              :center="center"
              :zoom="12"
              style="width:100%;  height: 400px;"
            >
              <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                @click="center=m.position"
              ></gmap-marker>
            </gmap-map>
            <div>
              <div v-for="(item, index) in person.items"  v-bind:key="`item-${index}`">
                <b-form-select v-model="item.name" :options="options"></b-form-select>
                  <input type="number" v-model="item.quantity">
              </div>
            <b-button variant="secondary" class="addItem" type="button" @click="addNewItem()"> Add Item</b-button>         
            </div>
            <b-button type="submit" class="btn-submit" variant="primary">Register</b-button>
        </b-form>
      </div>
    </div>
   </div>
</template>

<script>
import People from '@/services/people'

export default {
  name: 'Register',
  
  data(){
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      selected:'',
      people:[],
      person:{
        id:'',
        name:'',
        age:'',
        gender:'',
        lonlat:'',
        items: []
      },
      options: [
        { value: 'Water', text: 'Water' },
        { value: 'Food', text: 'Food' },
        { value: 'Medication', text: 'Medication' },
        { value: 'Ammunition', text: 'Ammunition'}
      ],             
      
    }
  },
  mounted() {
    this.geolocate();
  },

  methods:{
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
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    
    addNewItem() {
      this.person.items.push({
      name: '',
      quantity: 0
      })
    },
 
    prepareData() {
      const items = this.person.items.map(item => `${item.name}:${item.quantity}`)
      return items.join(';')
    },

    save(){
      
      if(!this.person.location){
        const person = Object.assign({}, this.person)
        person.items = this.prepareData()       
        People.save(person).then(response => {
        alert('Criado com sucesso!')
        console.log(response)
        window.location = 'http://localhost:8080/'
        })
      
      }else{ 
      
        People.update(this.person.location, this.person).then(response => {
        alert('Atualizado com sucesso!')
        console.log(response);
        })
      }
    },

    edit(person){
      this.person = person
    }
  }

}

</script>
<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Lato|Marcellus|Open+Sans|Open+Sans+Condensed:300|Oswald|Roboto&display=swap');

.pg-register{
 background-color: black;
}
  .pg-register.custom-background{
    background-color: #2d2c2a;
    background-image: url(../assets/img/fullbg.png);
    background-position: left top;
    background-size: auto;
    background-repeat: repeat;
    background-attachment: fixed;
  }
  .pg-register .element-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;

  }
    .pg-register .element-content h1{
      color: #fff;
      font-family: Marcellus,sans-serif;
      font-size: 45px;
      line-height: 1.22em;
    }
    .pg-register .element-content .form-register{
      width: 50%;
    }
      .pg-register .element-content .form-register .input{
        width: 100%;
        padding: 19px 31px;
        border: 1px solid #bbbec1;
        outline: 0;
        font-size: 15px;
        color: #fff;
        border-radius: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-family: "Open Sans",sans-serif;
        background-color: transparent;
        margin-bottom: 8px;
        -webkit-transition: border-color .2s ease-out;
        -moz-transition: border-color .2s ease-out;
        transition: border-color .2s ease-out;
      }
      .pg-register .element-content .form-register label{
      }
      .pg-register .element-content .form-register .custom-radio {
        display: inline-block;
        margin-right: 28px;
      }
        .pg-register .element-content .form-register .custom-radio label{
          display: inline;
          color: #fff;
        }
  .pg-register .element-content .form-register .btn-submit{ 
    font-family: Marcellus,sans-serif;
    font-size: 15px;
    line-height: 26px;
    text-transform: uppercase;
    border: 1px solid #585858;
    background-color: transparent;
    outline: 0;
    padding: 16px 56px 16px;
    cursor: pointer;
    font-weight: 400;
    text-align: center;
    border-radius: 0;
    -webkit-transition: all .2s ease-out;
    -moz-transition: all .2s ease-out;
    transition: all .2s ease-out;
    width: 100%;
  }
  .pg-register .element-content .form-register .btn-submit:hover{  
    background-color: rgba(255, 255, 255, 0);
    border-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 2px rgba(255,255,255,.75), 0 0 14px rgba(255,255,255,.5), 0 0 33px rgba(255,255,255,.25), 0 0 55px rgba(255,255,255,.25);
  }
  .pg-register .element-content .form-register .vue-map-container {
    height: 180px;
    max-width: 992px;
    width: 100%;
  }
  .pg-register .element-content .form-register label{

  }
  
</style>
