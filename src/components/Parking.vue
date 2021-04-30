<template>
  <div v-if="currentParking" class="edit-form">
    <h4>Parking</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentParking.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentParking.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentParking.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentParking.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteParking"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateParking"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Parking...</p>
  </div>
</template>

<script>
import ParkingDataService from "../services/ParkingDataService";

export default {
  name: "parking",
  data() {
    return {
      currentParking: null,
      message: ''
    };
  },
  methods: {
    getParking(id) {
      ParkingDataService.get(id)
        .then(response => {
          this.currentParking = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentParking.id,
        title: this.currentParking.title,
        description: this.currentParking.description,
        published: status
      };

      ParkingDataService.update(this.currentParking.id, data)
        .then(response => {
          this.currentParking.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateParking() {
      ParkingDataService.update(this.currentParking.id, this.currentParking)
        .then(response => {
          console.log(response.data);
          this.message = 'The parking was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteParking() {
      ParkingDataService.delete(this.currentParking.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "parkings" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getParking(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
