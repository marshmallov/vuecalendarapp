<template>
  <div class="">Admin Dashboard</div>
  <button @click="logout" type="logout">Log Out</button>
</template>
<script>
import { getAuth, } from "firebase/auth";
export default {
  name: "Dashboard",

  data() {
    return {};
  },

  methods: {
    logout() {
      const auth = getAuth();
      auth.signOut(auth).then(() => {
        localStorage.removeItem("isAuthenticated");
        this.$router.replace("/"); // Redirect to login page after logout
      });
    },
  },
};
</script>
<style>
button {
  padding: 0.75rem;
  border: none;
  background-color: #003f82;
  color: #ffffff;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>
