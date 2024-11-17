<template>
  <div class="popup-overlay">
    <div class="popup-container">
      <h2>Reservation</h2>
      <form @submit.prevent="submitReservation">
        <div class="form-group">
          <label>Selected Date</label>
          <input type="text" :value="date" readonly />
        </div>
        <div class="form-group">
          <label>Hour</label>
          <input type="text" :value="hour" readonly />
        </div>
        <div class="form-group">
          <label>Name</label>
          <input v-model="name" type="text" required />
        </div>
        <div class="form-group">
          <label>Surname</label>
          <input v-model="surname" type="text" required />
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input v-model="phone" type="tel" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required />
        </div>
        <div class="form-actions">
          <button type="submit" class="submit-btn">Submit</button>
          <button type="button" class="cancel-btn" @click="$emit('close')">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hour: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      surname: "",
      phone: "",
      email: "",
    };
  },
  methods: {
    submitReservation() {
      const formData = {
        hour: this.hour,
        name: this.name,
        surname: this.surname,
        phone: this.phone,
        email: this.email,
      };
      this.$emit("submit", formData);
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  /* position: fixed; */
  background: white;
  padding: 20px;
  /* border-radius: 8px; */
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.submit-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #ccc;
  color: black;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.cancel-btn:hover {
  background-color: #999;
}
</style>
