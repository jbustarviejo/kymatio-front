<template>
  <div class="main-container">
    <form v-on:submit.prevent="" class="main-form" action="/action_page.php">
      <label for="dname">Tipo del departamento</label>
      <input type="text" id="dtype" v-model="departmentType"  name="type" placeholder="Tipo de departmento">

      <label for="dtype">Nombre del departamento</label>
      <input type="text" id="dname" v-model="departmentName" name="name" placeholder="Nombre del departmento">

      <label for="group_mother_id">Departamento superior</label>
      <select id="group_mother_id" name="group_mother_id">
        <option value="">Elige un departamento superior</option>
        <option v-for="department_mother in departments" v-if="department.id != department_mother.id" :selected="department_mother.name == department.group_mother_name" :value="department_mother.id">{{department_mother.name}}</option>
      </select>

      <button @click="save()">{{this.new ? 'Guardar' : 'Actualizar'}}</button>
      <button v-if="!this.new" class="danger" @click="deleteDepartment()">Eliminar</button>
    </form>
    <div v-if="!this.new">
      <h1>Empleados</h1>
      <!-- Employees list -->
      <div v-if="employees && employees.length>0">
        <table>
          <tr>
            <th>Nombre de empleado</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Address</th>
            <th>Factor de riesgo</th>
            <th>Superior</th>
          </tr>
          <tr @click="editEmployee(employee)" class="at-bubble-block" v-for="employee in employees">
            <td >{{employee.name}}</td>
            <td>{{employee.surname}}</td>
            <td>{{employee.email}}</td>
            <td>{{employee.address}}</td>
            <td>{{employee.risk}}</td>
            <td>{{employee.employee_boss_name}}</td>
          </tr>
        </table>
      </div>
      <div v-else>
        <i>- No hay empleados-</i>
      </div>
      <!-- <button v-if="!this.new" @click="save()">Añadir</button> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Departament',
  props: {
    department: Object,
    departments: Array,
    companyId: String,
    new: Boolean
  },
  data() {
    return {
      departmentName: '',
      departmentType: '',
      departmentAddress: '',
      employees: []
    }
  },
  mounted () {
    this.departmentName=this.department.name || ''
    this.departmentType=this.department.type || ''
    axios
      .get('http://prueba-kymatio.com/employee/'+(this.new ? '' : '?department_id='+this.department.id))
      .then(response => (this.employees=response.data))
  },
  methods: {
    save(){
      if (!this.departmentName){
        alert("Introduce nombre del departmento")
        return
      }
      var form = document.querySelector('form');
      var data = new FormData(form);
      axios.post('http://prueba-kymatio.com/department/save/'+(this.new? '?company_id='+this.companyId:this.department.id), data).then(response => {
        this.$emit('eventListDepartment')
      })
    },
    deleteDepartment(){
      axios.delete('http://prueba-kymatio.com/department/delete/'+this.department.id).then(response => {
        this.$emit('eventListDepartment')
      })
    },
    editEmployee(){

    },
    createDepartment(){
      this.$emit('eventCreateCepartment')
    },
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
