<template>
  <div id="Titulo">
    <h2>Historial de Compras</h2> 
  </div>
  <h2> </h2>
  <div id="containerSearch">
    <h2> Consultar un producto </h2>

    <form v-on:submit.prevent="processBuyHistory">
      <input
        type="text"
        v-model="buyByProductId.productId"
        placeholder="Nombre del Producto"
      />
      <br />
      <button type="submit">Consultar historial del producto</button>
    </form>
  </div>
  <div id="BuyHistorial">
    <table style="width: 370px">
      <tr>
        <th><div>Fecha</div></th>
        <th><div>Hora</div></th>
        <th><div>Producto</div></th>
        <th><div>Cantidad</div></th>
      </tr>
      <tr v-for="buy in buyByProductId" :key="buy.id">
        <td>{{ buy.date.substring(0, 10) }}</td>
        <td>{{ buy.date.substring(11, 19) }}</td>
        <td>{{ buy.productIdBuy}}</td>
        <td>{{ buy.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "BuyHistorial",
  data: function () {
    return {
      username: "none",
      buyByProductId: [],
    };
  },
  created: function () {
    this.username = this.$route.params.username;
  },
  apollo: {
    buyByProductId: {
      query: gql`
        query ($buyByProductIdUserId: String!, $buyByProductIdProductId: String!) {
            buyByProductId(userId: $buyByProductIdUserId, productId: $buyByProductIdProductId) {
                id
                productIdBuy
                value
                date
          }
        }
      `,
      variables() {
        return {
          buyByProductIdUserId: localStorage.getItem("user_id"),
          buyByProductIdProductId: "Martillo",
        };
      },
    },
  },
};
</script>


<style>
#Titulo{
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: center;    
        align-items: end;
}
#Titulo h2{
        font-size: 30px;
        color: #283747;
}
#containerSearch {
  padding: 10px 10px;
  border: 3px solid #e69d29;
  border-radius: 20px;
  justify-content: center; 
  width: 30%;
  margin-left: auto;
  margin-right: auto;
}

#BuyHistorial {
  width: 100%;
  height: 120%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#BuyHistorial table {
  width: 50%;
  border-collapse: collapse;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
#BuyHistorial table td,
#BuyHistorial table th {
  border: 1px solid #ddd;
  padding: 8px;
}
#BuyHistorial table tr:nth-child(even) {
  background-color: #f2f2f2;
}
#BuyHistorial table tr:hover {
  background-color: #ddd;
}
#BuyHistorial table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #e69d29;
  color: white;
}
/* scrolltable rules */
table  { 
  margin-top:  -18%; 
  display: inline-block; 
  overflow: auto;
}
th div { 
  margin-top: -10px; 
  position: center; 
  }
/* design */
table { 
  border-collapse: collapse; 
  height: 50%; 
  }
tr:nth-child(even) { 
  background: #EEE; 
  }
</style>