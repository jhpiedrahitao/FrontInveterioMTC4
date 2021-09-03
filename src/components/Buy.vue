<template>
  <div id="Buy" class="buy">
    <div class="container_buy">
      <h2>Agregar compra al inventario</h2>

      <form v-on:submit.prevent="processBuy">
        <input
          type="text"
          v-model="createBuyBuy.productIdBuy"
          placeholder="Nombre del producto"
        />
        <br />
        <input
          type="number"
          v-model="createBuyBuy.value"
          placeholder="cantidad"
        />
        <br />
        <button type="submit">Agregar Compra</button>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "Buy",
  data: function () {
    return {
      createBuyUserId: localStorage.getItem("user_id"),
      createBuyBuy: {
        productIdBuy: "",
        value: "",
      },
    };
  },
  methods: {
    processBuy: async function () {
      console.log(this.createBuyUserId);
      console.log(this.createBuyBuy.productIdBuy);
      console.log(this.createBuyBuy.value);
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($createBuyUserId: String!, $createBuyBuy: BuyInput!) {
              createBuy(userId: $createBuyUserId, buy: $createBuyBuy) {
                id
                productIdBuy
                value
                date
              }
            }
          `,
          variables: {
            createBuyUserId: this.createBuyUserId,
            createBuyBuy: this.createBuyBuy,
          },
        })
        .then((result) => {
          alert("Compra Agregada, Revise Historial o Inventario")
        })
        .catch((error) => {
            alert("Producto no existente");
        });
    },
  },
};
</script>

<style>
.buy {
  margin: 0;
  padding: 0%;
  height: 130%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container_buy {
  border: 3px solid #e69d29;
  border-radius: 10px;
  width: 25%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.buy h2 {
  color: #283747;
}
.buy form {
  width: 50%;
}
.buy input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.buy button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #b97e20;
  border: 1px solid #e5e7e9;
  border-radius: 20px;
  padding: 5px 25px;
  margin: 5px 0;
}
.buy button:hover {
  color: #e5e7e9;
  background: rgb(20, 5, 104);
  border: 1px solid #283747;
}
</style>