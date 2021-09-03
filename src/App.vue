<template>
  <div id="app" class="app">
    <div class="header">
      <h1>Inventario de Ferreteria</h1>
      <nav>
        <button v-on:click="init" v-if="is_auth" > Inicio </button>
        <button v-on:click="inventory" v-if="is_auth" > Inventario </button>
        <button v-on:click="buy" v-if="is_auth" > Compra </button>
        <button v-on:click="sell" v-if="is_auth" > Venta </button>
        <button v-on:click="buyHistorial" v-if="is_auth" > Historial compras </button>
        <button v-on:click="sellHistorial" v-if="is_auth" > Historial ventas </button>
        <button v-on:click="logOut" v-if="is_auth" > Cerrar Sesión </button>

      </nav>
    </div>
    
    <div class="main-component">
      <router-view v-on:log-in="logIn"></router-view>
    </div>

    <div class="footer">
      <h2>Grupo 2 ciclo 4a Misión TIC 2022</h2>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'App',

  data: function(){
    return{
      is_auth: false
    }
  },

  created: function(){
    this.updateAccessToken();
  },

  methods:{
    updateAccessToken: async function(){
      if(localStorage.getItem('refresh_token')==null){
        this.$router.push({name: "user_auth"})
        this.is_auth = false
        return;
      }
      await this.$apollo.mutate({
        mutation: gql`
           mutation ($refreshTokenRefresh: String!) {
            refreshToken(refresh: $refreshTokenRefresh) {
              access
            }
          }`
        ,
        variables: {
          refreshTokenRefresh: localStorage.getItem('refresh_token')
        }
        }).then((result) => {
          localStorage.setItem('access_token', result.data.refreshToken.access)
          this.is_auth = true
        }).catch((error) => {
          alert("Su sesión expiró, vuelva a iniciar sesión.")
          this.$router.push({name: "user_auth"})
          this.is_auth = false
          localStorage.clear();
        });
      },

    logIn: async function(data, username){
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      localStorage.setItem('user_id', data.user_id)
      localStorage.setItem('current_username', username)

      await this.updateAccessToken();
      if(this.is_auth) this.init();
    },

    init: function(){
      this.$router.push({
        name: "user",
        params:{ username: localStorage.getItem("current_username") }
      })
    },
    
    account: function () {
      this.$router.push({
        name: "account",
        params: { username: localStorage.getItem("current_username") },
      });
    },

    inventory: function () {
      this.$router.push({
        name: "inventory",
        params: { username: localStorage.getItem("current_username") },
      });
    },

    buy: function () {
      this.$router.push({
        name: "buy",
        params: { username: localStorage.getItem("current_username") },
      });
    },

    sell: function () {
      this.$router.push({
        name: "sell",
        params: { username: localStorage.getItem("current_username") },
      });
    },

    sellHistorial: function () {
      this.$router.push({
        name: "sellHistorial",
        params: { username: localStorage.getItem("current_username") },
      });
    },

    buyHistorial: function () {
      this.$router.push({
        name: "buyHistorial",
        params: { username: localStorage.getItem("current_username") },
      });
    },

    logOut: async function(){
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('current_username')
      await this.updateAccessToken();
    }
  }
}

</script>

<style>
  body{
    margin: 0 0 0 0;
  }

  .header{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 75px;
    margin: 0%;
    padding: 0;

    background-color: #e69d29 ;
    color:#E5E7E9  ;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h1{
    width: 35%;
    text-align: center;
    font-weight: bold;
  }

  .header nav {
    height: 100%;
    width: 60%;

    display: flex;
    justify-content: space-around;
    align-items: center;

    font-size: 20px;
  }

  .header nav button{
    color: #E5E7E9;
    background: #e69d29;
    border: 1px solid #E5E7E9;

    border-radius: 20px;
    padding: 5px 20px;
    font-weight: bold;
  }

  .header nav button:hover{
    color: #e69d29;
    background: #E5E7E9;
    border: 1px solid #E5E7E9;
  }

  .main-component{
    height: 75vh;
    margin: 0%;
    padding: 0%;

    background: #FDFEFE ;
  }
 
  .footer{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 45px;

    background-color: #e69d29;
    color: #E5E7E9;
  }

  .footer h2{
    margin: 0px;
    width: 100%;
    height: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
