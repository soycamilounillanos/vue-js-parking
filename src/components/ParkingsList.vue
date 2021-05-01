<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Buscar por identificacion"
          v-model="q"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="search"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Actividad</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(parking, index) in parkings"
          :key="index"
          @click="setActiveParking(parking, index)"
        >
          {{ parking.placa }} - {{parking.name}} - {{parking.place}}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentParking">
        <h4>Parking</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentParking.name }}
        </div>
        <div>
          <label><strong>identificacion:</strong></label> {{ currentParking.document_number }}
        </div>
        <div>
          <label><strong>Placa:</strong></label> {{ currentParking.placa }}
        </div>
        <div>
          <label><strong>Salida:</strong></label> {{ currentParking.leaving_date || "Pendiente" }}
        </div>
        <div>
          <label><strong>hours:</strong></label> {{ currentParking.hours || "Pendiente" }}
        </div>
        <div v-if="!currentParking.leaving_date">
          <label><strong class="badge badge-warning" @click="checkout">Salida</strong></label>
        </div>
      </div>
      <div v-else>
        <br />
        <p>Haga click en actividad...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ParkingDataService from "../services/ParkingDataService";

export default {
  name: "parkings-list",
  data() {
    return {
      parkings: [],
      currentParking: null,
      currentIndex: -1,
      q: ""
    };
  },
  methods: {
    retrieveParkings() {
      ParkingDataService.getAll()
        .then(response => {
          this.parkings = response.data.customers
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveParkings();
      this.currentParking = null;
      this.currentIndex = -1;
    },

    setActiveParking(parking, index) {
      this.currentParking = parking;
      this.currentIndex = index;
    },

    checkout () {
      ParkingDataService.checkout(this.currentParking.id)
        .then(response => {
          console.log(response.data);
          this.refreshList()
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    search() {
      ParkingDataService.search(this.q)
        .then(response => {
          this.parkings = response.data.customers
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveParkings();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
