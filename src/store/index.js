import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

const instance = axios.create({
	baseURL: "https://randomuser.me",
	timeout: 1000,
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    randomUsers: [],
    filters: {
      searchQuery: '',
      gender: null,
      genderList: [],
      genderListObjects: Array({ text: 'Escoger género', value: null }),
      state: null,
      stateList: [],
      stateListObjects: Array({ text: 'Escoger estado', value: null })
    }
  },
  mutations: {
    DATA_RANDOM_USERS(state, data) {
      state.randomUsers = data
    },
    DATA_GENDERS(state, data) {
      state.filters.genderList = data
    },
    DATA_GENDERS_OBJECTS(state, data) {
      state.filters.genderListObjects = data
    },
    DATA_STATES(state, data) {
      state.filters.stateList = data
    },
    DATA_STATES_OBJECTS(state, data) {
      state.filters.stateListObjects = data
    },
  },
  actions: {
    actionGetRandomUsers({ commit }) {
      const getRandomUsers = instance.get('/api/?results=100&nat=us')
      getRandomUsers.then((res) => {
        commit('DATA_RANDOM_USERS', res.data.results)

        let genderList = []
        let genderListObjects = []

        let stateList = []
        let stateListObjects = []
        
        res.data.results.forEach((user) => {
          if (genderList.indexOf(user.gender) == -1) { genderList.push(user.gender); genderListObjects.push({ text: user.gender, value: user.gender }) }
          if (stateList.indexOf(user.location.state) == -1) { stateList.push(user.location.state); stateListObjects.push({ text: user.location.state, value: user.location.state }) }

        })

        commit('DATA_GENDERS', genderList)
        commit('DATA_GENDERS_OBJECTS', [...this.state.filters.genderListObjects, ...genderListObjects])

        commit('DATA_STATES', stateList)
        commit('DATA_STATES_OBJECTS', [...this.state.filters.stateListObjects, ...stateListObjects])

      })
    }
  },
  getters: {
    filteredUsers: (state) => {
      let users = state.randomUsers
      let filteredUsers = []
      let activeFilters = false

      if (state.filters.searchQuery.length > 1) {
        activeFilters = true
        filteredUsers = users.filter(user => {
          let userName = `${user.name.first} ${user.name.last}`.toLowerCase()
          let inputText = state.filters.searchQuery.toLowerCase()
          return userName.includes(inputText)
        })
      }

      if (state.filters.gender != null) {
        if (filteredUsers.length == 0 && activeFilters == false) filteredUsers  = users

        activeFilters = true
        filteredUsers = filteredUsers.filter(user => {
          if (user.gender == state.filters.gender) return true
        })
      } 

      if (state.filters.state != null) {
        if (filteredUsers.length == 0 && activeFilters == false) filteredUsers  = users
        activeFilters = true
        filteredUsers = filteredUsers.filter(user => {
          if (user.location.state == state.filters.state) return true
        })
      }
      if (activeFilters) { return filteredUsers }
      else { return users }
    }
  }
})
