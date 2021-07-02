<template>

  <section class="formulario">
    <div class="jumbotron">
      <h2 style="color:white;">Post User</h2>
      <hr>
      <br>
      <vue-form :state="formState" @submit.prevent="enviar()">
        <validate tag="div">
          <label for="name" >Nombre</label>
          <input 
          type="text" 
          name="name" 
          id="name"   
          class="form-control"
          v-model.trim="formData.name"
          required
          :minlength="nameMin"
          :maxlength="nameMax"
          autocomplete="off"
          >
          <field-messages name="name" show="$dirty">
            <div slot="required" class="alert alert-danger mt-2">Campo requerido</div>
            <div slot="minlength" class="alert alert-danger mt-2">
              Ingrese al menos {{this.nameMin}} caracteres
            </div>
            <div v-if="formData.name.length == nameMax" class="alert alert-warning mt-2">
              Ingrese menos de {{this.nameMax}} caracteres
            </div>
          </field-messages>
        </validate>


        <validate tag="div">
          <label for="age" >Edad</label>
          <input 
          type="number" 
          name="age" 
          id="age"   
          class="form-control"
          v-model.number="formData.age"
          required
          :min="ageMin"
          :max="ageMax"
          autocomplete="off"
          >
          <field-messages name="age" show="$dirty">
            <div slot="required" class="alert alert-danger mt-2">Campo requerido</div>
            <div slot="min" class="alert alert-danger mt-2">
              La edad minima es de {{ageMin}}
            </div>
            <div slot="max" class="alert alert-danger mt2">
              La edad maxima es de {{ageMax}}
            </div>
          </field-messages>
        </validate>

        <validate tag="div">
          <label for="email" >Email</label>
          <input 
          type="email" 
          name="email" 
          id="email"   
          class="form-control"
          v-model.trim="formData.email"
          required
          autocomplete="off"
          >
          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-danger mt-2">Campo requerido</div>
            <div slot="email" class="alert alert-danger mt-2">
              Email invalido
            </div>
          </field-messages>
        </validate>

        <button class="btn" type="submit" :disabled="formState.$invalid" :class="getClass(formState.$invalid)" v-on:click="enviar()">Enviar</button>
        <!-- <pre>{{formData}}</pre> -->
      
      </vue-form>
    </div>    
  </section>

</template>

<script>
  export default  {
    name: 'formulario',
    props: [],
    mounted () {

    },
    data () {
      return {
        formData:this.getInitialData(),
        formState:{},
        nameMin:3,
        nameMax:15,
        ageMax:120,
        ageMin:18,
      }
    },
    methods: {
      getInitialData(){
        return {
          name:"",
          age:"",
          email:"",
        }
      },
      getClass(invalido) {
          return [
              {
                'btn-secondary':invalido,
                'btn-success':!invalido
              }
          ]
      },
      enviar(){
        console.log({...this.formData})
        this.postUser(this.formData)
        this.formData=this.getInitialData()
        this.formState._reset()
      },
      async postUser(data){
        try {
          data.nombre=data.name
          data.edad=data.age
          delete data.age
          delete data.name
          console.log(data);
          await this.axios.post(this.$store.state.urlMock,data,{'content-type':'application/json'})
          console.log(`Usuario posteado ${data}`);
        } catch (error) {
          console.error(error);
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.jumbotron{
  background-color: #3d1a5f;
}
hr{
  background-color: #ffffff;
}
label{
  color: #ffffff;
}
pre{
  background-color: #ffffff;
  margin-top: 50px;
}
div{
  margin-bottom: 30px;
}
</style>
