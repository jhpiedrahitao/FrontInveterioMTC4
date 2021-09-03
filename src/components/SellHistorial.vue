<template>
  <div id="Titulo">
    <h2>Historial de Ventas</h2> 
  </div>
  <h2> </h2>
  <div id="containerSearch">
    <h2> Consultar un producto </h2>

    <form v-on:submit.prevent="processBuyHistory">
      <input
        type="text"
        v-model="sellByProductId.productId"
        placeholder="Nombre del Producto"
      />
      <br />
      <button type="submit">Consultar historial del producto</button>
    </form>
  </div>
  <div id="SellHistorial">
    <table style="width: 370px">
      <tr>
        <th><div>Fecha</div></th>
        <th><div>Hora</div></th>
        <th><div>Producto</div></th>
        <th><div>Cantidad</div></th>
      </tr>
      <tr v-for="sell in sellByProductId" :key="sell.id">
        <td>{{ sell.date.substring(0, 10) }}</td>
        <td>{{ sell.date.substring(11, 19) }}</td>
        <td>{{ sell.productIdSell}}</td>
        <td>{{ sell.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "SellHistorial",
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
    sellByProductId: {
      query: gql`
        query ($sellByProductIdUserId: String!, $sellByProductIdProductId: String!) {
            sellByProductId(userId: $sellByProductIdUserId, productId: $sellByProductIdProductId) {
                id
                productIdSell
                value
                date
          }
        }
      `,
      variables() {
        return {
          sellByProductIdUserId: localStorage.getItem("user_id"),
          sellByProductIdProductId: "Martillo",
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

#SellHistorial {
  width: 100%;
  height: 120%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#SellHistorial table {
  width: 50%;
  border-collapse: collapse;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
#SellHistorial table td,
#SellHistorial table th {
  border: 1px solid #ddd;
  padding: 8px;
}
#SellHistorial table tr:nth-child(even) {
  background-color: #f2f2f2;
}
#SellHistorial table tr:hover {
  background-color: #ddd;
}
#SellHistorial table th {
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