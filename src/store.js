import Vue from 'vue'
import Vuex from 'vuex'
import client from './http'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users:{},
        urlMock : 'https://609dba3e33eed80017957062.mockapi.io/users'
    },
    actions : {
         receiveUsers({commit}){
            console.log('actions');
            client.axios(this.state.urlMock)        
            .then( respuesta => {
                commit('getUsers',respuesta.data)
            })
            .catch(error => console.error(error))
        },
        receivePost({commit},data){
            console.log('actions');
            client.axios(this.state.urlMock)        
            client.axios.post(this.$store.state.urlMock,
                data,
                {'content-type':'application/json'})
            .then( respuesta => {
                commit('postUser',respuesta.data)
            })
            .catch(error => console.error(error))
        },
    },
    mutations : {
        getUsers(state,users) {
            console.log('mutations');
            state.users = users
        },
        postUser(state,res) {
            console.log('mutations');
            console.log(res);
        },

    }
}
)
