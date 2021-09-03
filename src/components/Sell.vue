<template>
  <div id="Sell" class="sell">
    <div class="container_sell">
      <h2>Descontar venta del inventario</h2>

      <form v-on:submit.prevent="processSell">
        <input
          type="text"
          v-model="createSellSell.productIdSell"
          placeholder="Nombre del producto"
        />
        <br />
        <input
          type="number"
          v-model="createSellSell.value"
          placeholder="cantidad"
        />
        <br />
        <button type="submit">Descontar venta</button>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "Sell",
  data: function () {
    return {
      createSellUserId: localStorage.getItem("user_id"),
      createSellSell: {
        productIdSell: "",
        value: "",
      },
    };
  },
  methods: {
    processSell: async function () {
      console.log(this.createSellUserId);
      console.log(this.createSellSell.productIdSell);
      console.log(this.createSellSell.value);
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($createSellUserId: String!, $createSellSell: SellInput!) {
              createSell(userId: $createSellUserId, sell: $createSellSell) {
                id
                productIdSell
                value
                date
              }
            }
          `,
          variables: {
            createSellUserId: this.createSellUserId,
            createSellSell: this.createSellSell,
          },
        })
        .then((result) => {
          alert("Venta Descontada, Revise Historial o Inventario")
        })
        .catch((error) => {
          alert("Producto no existente, o fuera de stock");
        });
    },
  },
};
</script>

<style>
.sell {
  margin: 0;
  padding: 0%;
  height: 130%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container_sell {
  border: 3px solid #e69d29;
  border-radius: 10px;
  width: 25%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sell h2 {
  color: #283747;
}
.sell form {
  width: 50%;
}
.sell input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.sell button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #b97e20;
  border: 1px solid #e5e7e9;
  border-radius: 20px;
  padding: 5px 25px;
  margin: 5px 0;
}
.sell button:hover {
  color: #e5e7e9;
  background: rgb(20, 5, 104);
  border: 1px solid #283747;
}
</style>