import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/parkings",
      name: "parkings",
      component: () => import("./components/ParkingsList")
    },
    {
      path: "/parkings/:id",
      name: "parking-details",
      component: () => import("./components/Parking")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddParking")
    }
  ]
});
