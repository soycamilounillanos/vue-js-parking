<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <form onsubmit="return false;" @submit="login">
      <div class="form-group">
        <label for="name">Usuario</label>
        <input
          type="text"
          class="form-control"
          id="user"
          required
          v-model="parking.user"
          name="user"
        />
      </div>

      <div class="form-group">
        <label for="description">Contraseña</label>
        <input
          class="form-control"
          id="password"
          required
          v-model="parking.password"
          name="password"
          type="password"
        />
      </div>
      <button class="btn btn-success">Ingresar</button>
      </form>
    </div>
    <div v-else>
      <h4>Ingreso exitoso!</h4>
    </div>
  </div>
</template>

<script>
import LoginDataService from "../services/LoginDataService";

export default {
  name: "add-parking",
  data() {
    return {
      parking: {
        user: "",
        password: ""
      },
      submitted: false
    };
  },
  methods: {
    login() {
      var data = {
        email_or_username: this.parking.user,
        password: this.parking.password
      };
      LoginDataService.login(data)
        .then(response => {
          sessionStorage.setItem('jwt', 'Bearer ' + response.data.token);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    logout() {
      this.submitted = false;
      this.parking = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>