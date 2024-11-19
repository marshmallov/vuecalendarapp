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
          <input v-model="name" type="text" required placeholder="Name"/>
        </div>
        <div class="form-group">
          <input v-model="surname" type="text" required placeholder="Surname"/>
        </div>
        <div class="form-group">
          <input v-model="phone" type="tel" required placeholder="Mobile Number" pattern="[0-9]{9}"
          title="Please enter a valid 9-digit mobile number"/>
        </div>
        <div class="form-group">
          <input v-model="email" type="email" required placeholder="Email"/>
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
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
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
  inject: ["db"],
  methods: {
    async submitReservation() {
      try {
        const reservationData = {
          name: this.name,
          surname: this.surname,
          phone: this.phone,
          email: this.email,
        };

        // Reference to the document in the `reservations` collection
        const docRef = doc(this.db, "Reservations", this.date);

        // Check if the document exists
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          // If the document exists, update the array for the specific hour
          await updateDoc(docRef, {
            [this.hour]: arrayUnion(reservationData),
          });
        } else {
          // If the document does not exist, create it with the hour and reservation array
          await setDoc(docRef, {
            [this.hour]: [reservationData],
          });
        }

        // Emit success event and close popup
        this.$emit("submit", { date: this.date, hour: this.hour, ...reservationData });
        this.$emit("close");
        alert("Reservation successfully submitted!");
      } catch (error) {
        console.error("Error submitting reservation:", error);
        alert("Failed to submit the reservation. Please try again.");
      }
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
