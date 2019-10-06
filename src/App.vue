<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-if="listing">
      <ListCompanies
        @eventEditCompany="editCompany"
        @eventCreateCompany="createCompany"
      />
    </div>
    <div v-else>
      <Company
        :company="company"
        :new="isCreateCompany"
        @eventListCompanies="resetListCompanies"
      />
    </div>
  </div>
</template>

<script>
import ListCompanies from './components/ListCompanies.vue'
import Company from './components/Company.vue'

export default {
  name: 'app',
  components: {
    ListCompanies,
    Company
  },
  data() {
    return {
      listing: true,
      company: {}
    }
  },
  methods: {
    editCompany(company){
      this.company=company
      this.isCreateCompany=false
      this.listing=false
    },
    createCompany(){
      this.company={}
      this.isCreateCompany=true
      this.listing=false
    },
    resetListCompanies(){
      this.listing = true
      this.company = {}
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app img {
  height: 200px;
}
</style>
