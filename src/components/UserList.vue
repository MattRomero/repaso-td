<template>
  <div class="row mx-0">
    <div class="col-12 row mx-0">
      <div class="col-md-6 col-lg-4 mx-auto mt-3"> 
        <input type="text" class="form-control" placeholder="Buscar por nombre" v-model="filters.searchQuery" />
      </div>
      <div class="col-md-6 col-lg-4 mx-auto my-3"> 
        <select v-model="filters.gender" class="form-control">
          <option v-for="gender in filters.genderListObjects" :value="gender.value" :key="gender.value">
            {{ gender.text }}
          </option>
        </select>
      </div>
      <div class="col-md-6 col-lg-4 mx-auto my-3"> 
        <select v-model="filters.state" class="form-control">
          <option v-for="state in filters.stateListObjects" v-bind:value="state.value" v-bind:key="state.value">
            {{ state.text }}
          </option>
        </select>
      </div>
    </div>
    <div v-for="user in filteredUsers" :key="user.id.value" class="col-12 col-md-6 col-lg-4 p-3">
      <div class="border rounded py-2">
        <img :src="user.picture.large" class="mb-3">
        <h3>{{ `${user.name.first} ${user.name.last}` }}</h3>
        <h6>{{ `${user.dob.age} años` }}</h6>
        <h6>{{ `${user.location.state}` }}</h6>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapState, mapGetters } from "vuex"
  
  export default {
    name: 'UserList',
    computed: {
      ...mapState(['filters']),
      ...mapGetters(['filteredUsers'])
    }
  }
</script>
