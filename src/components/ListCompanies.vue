<template>
  <div class="main-container">
    <h1>Bienvenido a la gestión de compañías</h1>
    <button @click="createCompany()">Añadir compañía</button>
    <!-- Company list -->
    <div v-if="companies && companies.length>0">
      <table>
        <tr>
          <th>Nombre</th>
          <th>CIF</th>
          <th>Dirección</th>
        </tr>
        <tr @click="editCompany(company)" class="at-bubble-block" v-for="company in companies">
          <td>{{company.name}}</td>
          <td>{{company.cif}}</td>
          <td>{{company.address}}</td>
        </tr>
      </table>
    </div>
    <div id="empty-list" v-else>
      <i>- No hay compañías-</i>
    </div>
    <!-- End of company list -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ListCompanies',
  props: {
    companiesInitial: Array,
  },
  data() {
    return {
      companies: [],
      selectedCompany: null
    }
  },
  mounted() {
    if(this.companiesInitial){
      this.companies=this.companiesInitial
    }else{ //load from API
      axios
         .get('http://prueba-kymatio.com/company')
         .then(response => (this.companies=response.data))
    }
   },
   methods: {
     createCompany(){
       this.$emit('eventCreateCompany')
     },
     editCompany(company){
       this.$emit('eventEditCompany', company)
     }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-bottom: 30px;
  cursor: pointer;
}

table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 50px;
}

table td, table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr{
  cursor: pointer;
}

table tr:nth-child(even){background-color: #f2f2f2;}

table tr:hover {background-color: #ddd;}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>
