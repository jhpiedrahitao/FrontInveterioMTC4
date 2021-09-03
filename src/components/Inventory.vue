<template>
  <div id="Inventory">
    <div id="containerSearch">
      <h2> Consultar un producto </h2>

      <form v-on:submit.prevent="processInventory">
        <input
          type="text"
          v-model="quantityByProductId.productId"
          placeholder="Nombre del Producto"
        />
        <br />
        <button type="submit">consultar Producto</button>
      </form>
    </div>

       <h2> </h2>

    <div id="container">
      <h2>
        Producto: <span>{{ quantityByProductId.productId }}</span>
      </h2>
      <h2>
        Cantidad: <span>{{ quantityByProductId.quantity }}</span>
      </h2>
      <h2>
        Fecha Ultimo Movimiento:
        <span>{{ quantityByProductId.lastChange.substring(0, 10) }}</span>
      </h2>
      <h2>
        Hora Ultimo Movimiento:
        <span>{{ quantityByProductId.lastChange.substring(11, 19) }}</span>
      </h2>
    </div>
  </div>
</template>


<script>
import gql from "graphql-tag";

export default {
  name: "Inventory",

  data: function () {
    return {
      username: "none",
      quantityByProductId: {
        productId: "null",
        quantity: "null",
        lastChange: "null",
      }
    };
  },

  created: function () {
    this.username = this.$route.params.username;
  },

  apollo: {
    quantityByProductId: {
      query: gql`
        query ($quantityByProductIdProductId: String!, $quantityByProductIdUserId: String!) {
          quantityByProductId(productId: $quantityByProductIdProductId, userId: $quantityByProductIdUserId) {
          productId
          lastChange
          quantity
          }
        }
      `,
      variables() {
        return {
          quantityByProductIdProductId:"Martillo",
          quantityByProductIdUserId:localStorage.getItem("user_id"),
        };
      },
    },
  },
};
</script>


<style>
#Inventory {
  width: 100%;
  height: 120%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#containerSearch {
  padding: 30px 170px;
  border: 3px solid #e69d29;
  border-radius: 20px;
  justify-content: center; 
}

#container {
  padding: 70px;
  border: 3px solid #e69d29;
  border-radius: 20px;
}
#Inventory h2 {
  font-size: 30px;
  color: #283747;
}
#Inventory span {
  color: crimson;
  font-weight: bold;
}
</style>