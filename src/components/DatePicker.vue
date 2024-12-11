<template>
  <div class="date-picker">
    <!-- Label for the date picker -->
    <label for="date-picker">Select Date:</label>

    <!-- Date picker input field bound to the selectedDate -->
    <input
      type="date"
      id="date-picker"
      v-model="selectedDate"
      :min="currentDate"
      @change="fetchReservations"
    />
    <!-- Display the selected date -->
    <p>Selected Date: {{ selectedDate }}</p>

    <div class="listview">
      <div v-for="hour in allHours" :key="hour" class="listview-item">
        <span class="hour-text">{{ hour }}</span>
        <!-- Show "Reserved" label if hour is in reservedHours -->
        <template v-if="reservedHours.includes(hour)">
          <span class="reserved-label">Reserved</span>
        </template>
        <!-- Show "Reserve" button if hour is not reserved -->
        <template v-else>
          <button @click="openReservationPopup(hour)" class="reserve-btn">
            Reserve
          </button>
        </template>
      </div>
    </div>
    <!-- Reservation Popup -->
    <ReservationPopup
      v-if="isPopupOpen"
      :hour="selectedHour"
      :date="selectedDate"
      @close="closeReservationPopup"
      @submit="handleReservationSubmit"
    />
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import ReservationPopup from "./ReservationPopup.vue";
export default {
  name: "DatePicker",
  components: { ReservationPopup }, 
  data() {
    return {
      // Initialize currentDate to today's date in YYYY-MM-DD format
      currentDate: new Date().toISOString().split("T")[0],
      // Initialize selectedDate to today's date as the default value
      selectedDate: new Date().toISOString().split("T")[0],
      availableHours:[],
      allHours: [],
      reservedHours: [],
      isPopupOpen: false,
      selectedHour: null,
    };
  },
  inject: ["db"],
  mounted(){
    this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      if (!this.selectedDate) return;

      try {
        // Reference to the document "30min" under the "Hours" collection
        const docRef = doc(this.db, `Hours/30min`);

        // Fetch the document data
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          // Access all fields in the document (keys are the hours)
          // this.availableHours = Object.keys(docSnapshot.data());
          const data = docSnapshot.data();
          const rawHours = Array.from(data.hours || []);
          this.allHours = rawHours;
          console.log(this.allHours);
        } else {
          console.log("No document found for 30min.");
          this.allHours = [];
        }
        // Step 2: Check the `reservations` collection for reserved hours
        const reservationsDocRef = doc(this.db, "Reservations", this.selectedDate);
        const reservationsSnapshot = await getDoc(reservationsDocRef);

        if (reservationsSnapshot.exists()) {
          const reservationData = reservationsSnapshot.data();
          this.reservedHours = Object.keys(reservationData); // Reserved hours as keys
        } else {
          this.reservedHours = []; // No reservations for the selected date
        }

        // Step 3: Filter out reserved hours from availableHours
        this.availableHours = this.allHours.filter(
          (hour) => !this.reservedHours.includes(hour)
        );
      } catch (error) {
        console.error("Error fetching hours:", error);
      }
    },
    openReservationPopup(hour) {
      this.selectedHour = hour;
      this.isPopupOpen = true;
    },
    closeReservationPopup() {
      this.isPopupOpen = false;
    },
    handleReservationSubmit(formData) {
      console.log("Reservation submitted:", formData);
      this.closeReservationPopup();
      // Add your logic to save reservation data to Firestore here
    },
  },
};
</script>

<style scoped>
/* Basic styling for the date picker */

.date-picker {
  justify-content: center;
  align-items: center;
  z-index: 10;
  font-family: Arial, sans-serif;
  padding: 25px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  text-align: center;
}

/* Style the label */
.date-picker label {
  font-size: 18px;
  color: #000000;
  margin-bottom: 8px;
  display: inline-block;
}

#date-picker {
  width: 100%;
  padding: 0px;
  font-size: 28px;
  color: #000000;
  background-color: #ffffff;
  border: 5px solid #000000;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}
#date-picker:hover {
  border-color: #000000;
}

/* Style the selected date display */
.date-picker p {
  margin-top: 15px;
  font-size: 16px;
  color: #000000;
}
/* Styling for the list view container */
.listview {
  border: 1px solid #ccc;

  padding: 10px;
  background-color: #f9f9f9;
  max-height: 300px;
  overflow-y: auto; /* Enable vertical scrolling */
}

/* ListView Item Styling */
.listview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 1px solid #ddd;
}

.listview-item:last-child {
  border-bottom: none;
}
p {
  margin-top: 10px;
  font-size: 14px;
}
</style>
