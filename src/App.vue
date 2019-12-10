<template>
  <div>  
    <div id="app">
      <header>
        <div class="main-menu">
        <b-row>
          <b-col class="imagem">
            <img src="@/assets/img/logo.jpg" alt="Logo">
          </b-col>          
          <b-col class="items" >              
            <b-nav tabs justified>            
              <b-nav-item><b-link to="/" class="link">Home</b-link></b-nav-item>
              <b-nav-item><b-link to="/register" class="link">Register Survivors</b-link></b-nav-item>
              <b-nav-item><b-link to="/reports" class="link">Reports</b-link></b-nav-item>
              <b-nav-item><b-link to="/inventory" class="Invetary">inventory</b-link></b-nav-item>
            </b-nav>
          </b-col>
        </b-row>
      </div>
      </header>
      <router-view></router-view>
      <footer>
        
      </footer>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>
<style lang="scss">
  #app .main-menu{
    background: black;
    height: 50px;
  }
    #app .main-menu{
    }
    #app .main-menu img{
      display: block;
      max-width: 80px;
      height: auto;
      margin: 0 auto;
    }
      #app .main-menu  .nav-item a{
        color:#fff;
        border:none;
      }
        #app .main-menu  .nav-item a .link{
          text-decoration: none;
        }
   #app .main-menu .imagem,  #app .main-menu .items{ 
    width: 100%;
    display: inline-block;
  }
  #app .main-menu .imagem{
    max-width: 20%;
  }
  #app .main-menu .items{
    max-width: 80%;
  }
</style>