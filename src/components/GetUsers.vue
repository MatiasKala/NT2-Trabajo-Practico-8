<template>

  <section class="get-users">
    <div class="jumbotron">
      <h2 style="color:white;">Get Users</h2>
      <hr>
      <br>
      <br>
      <br>
      <table v-if="this.$store.state.users" class="table">
        <thead class="thead-dark">
          <tr>
            <th v-for="(col,index) in getColsName" :key="index">{{col}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in this.$store.state.users" :key="index">
            <td v-for="(data,i) in getColsName" :key="i">{{user[data]}}</td>
          </tr>
        </tbody>
      </table>
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
    async created(){
      this.$store.dispatch('receiveUsers')
    },
    methods: {
    },
    computed: {
      getColsName(){
        if(this.$store.state.users[0]){
          let cols = Object.keys(this.$store.state.users[0])
          return cols
        }
        return '' 
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
