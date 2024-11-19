<template>
  <div>
    <div class="">Admin Dashboard</div>
    <button @click="logout" type="logout">Log Out</button>

    <div class="reservations-container">
      <div v-if="loading" class="loading">Loading reservations...</div>
      
      <div v-else>
        <!-- Current Reservations -->
        <div v-if="Object.keys(currentReservations).length > 0" class="reservations-list">
          <h2>Current Reservations:</h2>
          <div v-for="(hours, date) in currentReservations" :key="date" class="date-section">
            <h3>{{ date }}</h3>
            <ul>
              <li v-for="(details, hour) in hours" :key="hour" class="reservation-item">
                <div class="hour">{{ hour }}</div>
                <div v-for="(detail, index) in details" :key="index" class="details">
                  <p><strong>Name:</strong> {{ detail.name }}</p>
                  <p><strong>Surname:</strong> {{ detail.surname }}</p>
                  <p><strong>Email:</strong> {{ detail.email }}</p>
                  <p><strong>Phone:</strong> {{ detail.phone }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Outdated Reservations -->
        <div v-if="Object.keys(outdatedReservations).length > 0" class="reservations-list">
          <h2>Outdated Reservations:</h2>
          <div v-for="(hours, date) in outdatedReservations" :key="date" class="date-section outdated">
            <h3>{{ date }}</h3>
            <ul>
              <li v-for="(details, hour) in hours" :key="hour" class="reservation-item">
                <div class="hour">{{ hour }}</div>
                <div v-for="(detail, index) in details" :key="index" class="details">
                  <p><strong>Name:</strong> {{ detail.name }}</p>
                  <p><strong>Surname:</strong> {{ detail.surname }}</p>
                  <p><strong>Email:</strong> {{ detail.email }}</p>
                  <p><strong>Phone:</strong> {{ detail.phone }}</p>
                </div>
              </li>
            </ul>
          </div>
          <button @click="deleteOutdatedReservations" class="delete-outdated-btn">Delete Outdated Reservations</button>
        </div>

        <!-- No Reservations -->
        <div v-if="Object.keys(currentReservations).length === 0 && Object.keys(outdatedReservations).length === 0" class="no-reservations">
          No reservations found.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAuth, } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc,} from "firebase/firestore";
export default {
  name: "Dashboard",

  data() {
    return {
      reservations:{},
      outdatedReservations:{},
      loading:true,
    };
  },
  mounted() {
    this.fetchReservations(); // Fetch reservations on mount
  },
  inject: ["db"],
  methods: {
    async fetchReservations() {
      try {
        const reservationsCollection = collection(this.db, "Reservations");
        const snapshot = await getDocs(reservationsCollection);

        const reservationsData = {};
        const today = new Date().toISOString().split("T")[0];


        const currentReservations = {};
        const outdatedReservations = {};

         snapshot.forEach((doc) => {
          const date = doc.id;
          const hours = doc.data();
          
          // Sort reservations based on date
          if (date < today) {
            outdatedReservations[date] = hours;
          } else {
            currentReservations[date] = hours;
          }
        });

        this.reservations = reservationsData;
        this.currentReservations = currentReservations;
        this.outdatedReservations = outdatedReservations;
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        this.loading = false;
      }
    },
    async deleteOutdatedReservations() {
      try {
        const batchDeletes = Object.keys(this.outdatedReservations).map((date) => {
          const docRef = doc(this.db, "Reservations", date);
          return deleteDoc(docRef);
        });

        await Promise.all(batchDeletes);

        // Clear outdatedReservations and refresh the list
        this.outdatedReservations = {};
        this.fetchReservations(); // Refresh the list
        alert("Outdated reservations deleted successfully.");
      } catch (error) {
        console.error("Error deleting outdated reservations:", error);
        alert("Failed to delete outdated reservations.");
      }
    },
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

.reservations-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.no-reservations {
  text-align: center;
  font-size: 1.2rem;
  color: #999;
}

.reservations-list {
  margin-top: 20px;
}

.date-section {
  margin-bottom: 20px;
}

.date-section h3 {
  background-color: #003f82;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.reservation-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.reservation-item:last-child {
  border-bottom: none;
}

.hour {
  font-weight: bold;
  margin-bottom: 5px;
}

.details {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #eef;
  border-radius: 4px;
}
p{
  color: #000000;
}
</style>
