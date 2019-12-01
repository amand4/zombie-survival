<template>

    <nav>
      <div class="nav-wrapper black darken-1">
        <a href="#" class="brand-logo center">Sobreviventes</a>
      </div>
    </nav>

    <!-- <div class="container">

      <form @submit.prevent="save">
          <label>Name</label>
          <input type="text" placeholder="name" v-model="person.name">
          <label>Age</label>
          <input type="number" placeholder="age" v-model="person.age">
          <label>Gender</label>
          <input type="text" placeholder="gender" v-model="person.gender">
          <label>Last location</label>
          <input type="text" placeholder="location">
          <label>Inventory</label>
          <input type="text" placeholder="inventory" v-model="person.items">
           -->
          <!-- <div>
            <input type="checkbox" id="water" value="water" v-model="items">
            <label for="water">water</label>
            <input type="checkbox" id="food" value="food" v-model="items">
            <label for="food">food</label>
            <input type="checkbox" id="milke" value="milke" v-model="items">
            <label for="milke">milke</label>
            <br>
            <span>Items assinalados: {{ items }}</span>
          </div> -->

          <!-- <button class="waves-effect waves-light btn-small">Save<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Id</th>

            <th>Name</th>
            <th>Age</th>
            <th>Gender</th> -->
            <!-- <th>Last Location</th> -->
            <!-- <th></th>

          </tr>

        </thead>

        <tbody>

          <tr v-for="person of people" :key="person.id">
            <td>{{person.location}}</td>
            <td>{{person.name}}</td>
            <td>{{person.age}}</td>
            <td>{{person.gender}}</td>

            <td>
              <button @click="edit(person)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>              
            </td>

          </tr>

        </tbody>
      
      </table> -->

    <!-- </div> -->

</template>

<script>

import People from '@/services/people'

export default {
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
  mounted(){
     People.list().then(response => {
       this.people = response.data
       console.log(response.data)
     })
   
  },

  methods:{

    save(){

      if(!this.person.location){
        People.save(this.person).then(response => {
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
  }
}

</script>
<style>
</style>
