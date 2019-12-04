<template>
  <div class="pg-register">

    <div class="container">
      <div class="element-content">
        <parallax>
          <img src="@/assets/img/twd-background-register.jpg" alt="background twd">
        </parallax>
        <div> 
          <h1> Register </h1>
        </div>
        <b-form @submit.prevent="save" class="form-register">
            <label>Name</label>
            <b-form-input class="input" type="text" placeholder="name" v-model="person.name"></b-form-input>
            <label>Age</label>
            <b-form-input class="input" type="number" placeholder="age" v-model="person.age"></b-form-input>
            <label>Gender</label>
            <b-form-input class="input" type="text" placeholder="gender" v-model="person.gender"></b-form-input>
            <label>Last location</label>
            <b-form-input class="input"  type="text" placeholder="LonLat"> </b-form-input>
            <!-- <GmapMap
            v-bind:center="{lat:10, lng:10}"
            v-bind::zoom="7"
            map-type-id="terrain"
            style="width: 500px; height: 225px"
          >
            <GmapMarker
              v-bind:key="index"
              v-for="(m, index) in markers"
              v-bind:position="m.position"
              v-bind:clickable="true"
            />
          </GmapMap> -->
            <label>Inventory</label>
            <b-form-group id="input-group-4">
              <b-form-checkbox-group v-model="person.items" id="checkboxes-4">
                <b-form-checkbox value="food:5">Food</b-form-checkbox>
                <b-form-checkbox value="water:2">Water</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>   
            <!-- <div> -->
            <!-- <div v-for="(item) in person.items"  v-bind:key="item">
                <input type="text" v-model="item.name"> 
                <input type="text" v-model="item.quantity">
            </div>
            <button @click="addNewItem()"></button>
            {{ prepareData }}

            {{ preparedData.join(';') }}
            </div> -->
            <b-button type="submit" class="btn-submit" variant="primary">Register</b-button>

        </b-form>
      </div>

    </div>

  </div>
</template>

<script>
import People from '@/services/people'
import Parallax from 'vue-parallaxy'

export default {
  name: 'Register',
  computed: {
    preparedData() {
      return this.prepareData()
    }
  },
  data(){
    return {
      people:[],
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
  methods:{
    
    addNewItem() {
      this.person.items.push({
      name: '',
      quantity: 0
      })
    },
    prepareData() {
      return this.person.items.map(item => `${item.name}:${item.quantity}`)
    },

    save(){
      
      if(!this.person.location){
        const person = Object.assign({}, this.person)
        // person.items = person.items.join(';')
        People.save(person).then(response => {
        alert('Criado com sucesso!')
        console.log(response);
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
  },
  components: {
      Parallax
    }
}

</script>
<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Lato|Marcellus|Open+Sans|Open+Sans+Condensed:300|Oswald|Roboto&display=swap');

.pg-register{
 background-color: black;
}
  .pg-register .element-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
        display:none;
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
</style>
