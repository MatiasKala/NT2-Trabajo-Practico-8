<template>

  <section class="get-users">
    <div class="jumbotron">
      <h2 style="color:white;">Get Users</h2>
      <hr>
      <br>
      <button class="btn btn-primary" @click="getUsuariosAsyncAwait()">GetUsers Async/await</button>
      <button class="btn btn-info ml-4" @click="getUsersFetch()">GetUsers Fetch</button>
      <br>
      <br>
      <br>
      <br>
      <table v-if="users.length" class="table">
        <thead class="thead-dark">
          <tr>
            <th v-for="(col,index) in getColsName" :key="index">{{col}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in users" :key="index">
            <td v-for="(data,i) in getColsName" :key="i">{{user[data]}}</td>
          </tr>
        </tbody>
      </table>
      <div v-else-if="!asked" class="alert alert-warning">Pida los usuarios con algun metodo GET</div>
      <div v-else class="alert alert-danger">No hay usuarios cargados</div>
    </div>
  </section>

</template>

<script>

  export default  {
    name: 'get-users',
    props: [],
    mounted () {
    },
    data () {
      return {
        users:[],
        urlMock:'https://609dba3e33eed80017957062.mockapi.io/users',
        asked:false
      }
    },
    methods: {
      async getUsuariosAsyncAwait(){
        try {
          let respuesta = await this.axios(this.urlMock)
          console.log('ASYNC/AWAIT',respuesta);
          this.users = respuesta.data
          this.asked=true
        } catch (error) {
          console.error(error);
        }
      },
      getUsersFetch() {
        fetch(this.urlMock)
        .then(datos => datos.json())
        .then(respuesta => {
          console.log("FETCH",respuesta)
          this.users = respuesta
          this.asked=true
          })
        .catch(error => console.error(error))
      },
    },
    computed: {
      getColsName(){
        if(this.users.length){
          let cols = Object.keys(this.users[0])
          return cols
        }
        return null 
      }
    }
}


</script>

<style scoped lang="css">
.jumbotron{
  background-color: #00234bf6;
}
td,th{
  background-color: #ffffff;
}
hr{
  background-color: #ffffff;
}
</style>
