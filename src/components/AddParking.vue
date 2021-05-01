
<template>
  
  <div class="submit-form">
    <div v-if="!submitted">
      <form onsubmit="return false;" @submit="saveParking">
      <div class="form-group">
        <label for="name">Nombre de cliente</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="parking.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="description">Numero de ducumento</label>
        <input
          class="form-control"
          id="document_number"
          required
          v-model="parking.document_number"
          name="document_number"
        />
      </div>

      <div class="form-group">
        <label for="description">Placa</label>
        <input
          class="form-control"
          id="placa"
          required
          v-model="parking.placa"
          name="placa"
          minlength="7" 
          maxlength="7"
        />
      </div>

      <div class="form-group">
        <label for="description">Espacio</label>
        <select
          id="place_id"
          name="place_id"
          v-model="parking.place_id"
          class="form-control form-select" 
          aria-label="Default select example"
          required
        >
          <option value=""></option>
          <option v-for="place in places" v-bind:key="place.id" v-bind:value="place.id">{{place.name}} - {{place.price}}</option>
        </select>
      </div>

      <button class="btn btn-success">Ingresar</button>
      </form>
    </div>
    <div v-else>
      <h4>Ingreso exitoso!</h4>
      <button class="btn btn-success" @click="newParking">Ingresar</button>
    </div>
  </div>
</template>

<script>
import ParkingDataService from "../services/ParkingDataService";
import PlaceDataService from "../services/PlaceDataService";

export default {
  name: "add-parking",
  data() {
    return {
      places: [],
      parking: {
        id: null,
        name: "",
        placa: "",
        document_number: "",
        place_id: ""
      },
      submitted: false
    };
  },
  methods: {
    retrievePlaces() {
      PlaceDataService.getAll()
        .then(response => {
          this.places = response.data.types;
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveParking() {
      var data = {
        name: this.parking.name,
        placa: this.parking.placa,
        document_number: this.parking.document_number,
        place_id: this.parking.place_id
      };
      console.log(data)
      ParkingDataService.create(data)
        .then(response => {
          this.parking.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          alert(e.error.message || "Ocurrio un error")
          console.log(e);
        });
    },
    
    newParking() {
      this.submitted = false;
      this.parking = {};
    }
  },

  mounted() {
    this.retrievePlaces();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>