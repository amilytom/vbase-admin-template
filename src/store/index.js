import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user.js'
import tagNav from './module/tagNav'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: user,
        tagNav: tagNav 
    }
})