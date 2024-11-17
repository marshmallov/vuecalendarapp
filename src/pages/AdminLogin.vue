<template>
  <div class="login-container">
    <div class="login-box">
      <h2></h2>
      <div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <div
        v-if="successMessage !== ''"
        class="alert alert-success"
        role="alert"
      >
        {{ successMessage }}
      </div>
      <form @submit.prevent="loginRequest">
        <div class="row text-left">
          <div>
            <input type="email" v-model="email" id="email" />
          </div>
          <div>
            <input type="password" v-model="password" id="password" />
          </div>
          <div class="col-sm-12 text-center form-group">
            <button
              v-bind:disabled="xhrRequest"
              v-bind:class="{ disabled: xhrRequest }"
              class="btn btn-lg btn-primary px-4"
            >
              <span v-if="!xhrRequest">Login</span>
              <span v-if="xhrRequest">Please Wait...</span>
            </button>
            <div
              v-if="xhrRequest"
              class="spinner-border text-secondary loader"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  name: "AdminLogin",
  data() {
    return {
      email: "",
      password: "",
      xhrRequest: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async loginRequest() {
      this.xhrRequest = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const auth = getAuth(); // Initialize Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        console.log(userCredential);
        localStorage.setItem("isAuthenticated", "true");
        this.$router.replace("dashboard");
        this.successMessage = "Logged in successfully!";
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.xhrRequest = false;
      }
    },
  },
};
</script>

<style>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}
.login-box {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 2rem;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  max-width: 320px;
  width: 100%;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

/* Style form elements */
form input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

form button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  background-color: #003f82;
  color: #ffffff;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

form button:hover {
  background-color: #0056b3;
}
</style>
