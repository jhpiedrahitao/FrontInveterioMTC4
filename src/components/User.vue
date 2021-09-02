<template>
    <div id="User">
        <h2>Hola <span> {{username}}, </span> ¡Bienvenido a la aplicacion de inventario de ferreteria!</h2>
    </div>
</template>

<script>
    export default {
        name: "User",

        data:function(){
            return {
                username: "none"
            }
        },
        
        created: function(){
            this.username = this.$route.params.username
        }
    }
</script>

<style>
    #User{
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;    
        align-items: center;
    }

    #User h2{
        font-size: 30px;
        color: #283747;
    }

    #User span{
        color: rgb(20, 40, 220);
        font-weight: bold;
    }
</style>