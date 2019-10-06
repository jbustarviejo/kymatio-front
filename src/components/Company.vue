<template>
  <div class="main-container" v-if="!editDepartament">
    <form v-on:submit.prevent="" class="main-form" action="/action_page.php">
      <label for="cname">Nombre</label>
      <input type="text" id="cname" v-model="companyName"  name="name" placeholder="Nombre de la compañía">

      <label for="ccif">CIF</label>
      <input type="text" id="ccif" v-model="companyCif" name="cif" placeholder="CIF de la empresa">

      <label for="caddress">Dirección</label>
      <input type="text" id="caddress" v-model="companyAddress" name="address" placeholder="Dirección de la empresa">

      <button @click="save()">{{this.new ? 'Guardar' : 'Actualizar'}}</button>
      <button v-if="!this.new" class="danger" @click="deleteCompany()">Eliminar</button>
    </form>
    <div v-if="!this.new">
      <h1>Departamentos</h1>
      <!-- Departament list -->
      <div v-if="departments && departments.length>0">
        <table>
          <tr>
            <th>Tipo</th>
            <th>Nombre</th>
            <th>Departamento superior</th>
          </tr>
          <tr class="at-bubble-block" v-for="department in departments">
            <td @click="editDepartment(department)">{{department.type}}</td>
            <td @click="editDepartment(department)">{{department.name}}</td>
            <td @click="editDepartment(department)">{{department.group_mother_name}}</td>
          </tr>
        </table>
      </div>
      <div v-else>
        <i>- No hay departmentos-</i>
      </div>
      <button @click="createDepartment()">Añadir</button>
    </div>
  </div>
  <Departament
    v-else
    :department="selectedDepartment"
    :departments="departments"
    :new="isNew"
    :companyId="company.id"
    @eventListDepartment="listDepartment"
  />
</template>

<script>
import axios from 'axios'
import Departament from './Department.vue'

export default {
  name: 'Company',
  props: {
    company: Object,
    new: Boolean
  },
  components: {
    Departament
  },
  data() {
    return {
      companyName: '',
      companyCif: '',
      companyAddress: '',
      companies: [],
      departments: [],
      editDepartament: false,
      selectedDepartment: []
    }
  },
  mounted () {
    console.log("mira", this.company)
    this.companyName=this.company.name || ''
    this.companyCif=this.company.cif || ''
    this.companyAddress=this.company.address || ''
    this.refreshDepartments()
  },
  methods: {
    save(){
      console.log("mira nombre", this.companyName);
      if (!this.companyName){
        alert("Introduce nombre de la compañía")
        return
      }
      var form = document.querySelector('form');
      var data = new FormData(form);
      axios.post('http://prueba-kymatio.com/company/save/'+(this.new?'':this.company.id), data).then(response => {
        this.$emit('eventListCompanies')
        console.log("res",response)
      })
    },
    refreshDepartments(){
      axios
        .get('http://prueba-kymatio.com/department/?company_id='+this.company.id)
        .then(response => (this.departments=response.data))
    },
    deleteCompany(){
      axios.delete('http://prueba-kymatio.com/company/delete/'+this.company.id).then(response => {
        this.$emit('eventListCompanies')
      })
    },
    createDepartment(){
      this.selectedDepartment={}
      this.editDepartament=true
      this.isNew=true
    },
    editDepartment(department){
      this.selectedDepartment=department
      this.editDepartament=true
      this.isNew=false
    },
    listDepartment(){
      this.editDepartament=false
      this.refreshDepartments()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-form{
  width: 50%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
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
  margin-top: 10px;
  cursor: pointer;
}
button.danger {
  background-color: #d43131; /* red */
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

input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
</style>
