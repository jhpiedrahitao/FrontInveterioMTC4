<template>
  <div id="Account">
    <div class="container">
      <h2>
        Producto: <span>{{ quantityByProductId.productId }}</span>
      </h2>

      <h2>
        Cantidad: <span> {{ quantityByProductId.quantity }} unidades </span>
      </h2>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Account",

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
          quantityByProductIdUserId: localStorage.getItem("user_id"),
          quantityByProductIdProductId: "Martillo"
        };
      },
    },
  },
};
</script>


<style>
#Account {
  width: 100%;
  height: 120%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container {
  padding: 70px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}

#Account h2 {
  font-size: 30px;
  color: #283747;
}
#Account span {
  color: crimson;
  font-weight: bold;
}
</style>