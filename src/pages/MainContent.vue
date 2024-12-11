<template>
    <Navbar/>
    <div class="parallax-container">
      <section id="home-section">
        <div
          class="parallax-item"
          style="background-image: url('/src/assets/images/IMG_1.jpg')"
        >
          <div class="parallax-content">
            <div class="content-card">
              <h1>Logo</h1>
              <p>
                <!-- Add your content here -->
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="about-section">
        <div
          class="parallax-item"
          style="background-image: url('/src/assets//images/IMG_2.jpg')"
        >
          <div class="parallax-content">
            <div class="content-card">
                 <!-- Content here -->
                  <!-- <TimePicker/> -->
              <p>
                Current Date: {{ formattedDate }}
              </p>
          
            </div>
          </div>
        </div>
      </section>
      
      <section id="services-section">
        <div
          class="parallax-item"
          style="background-image: url('/src/assets//images/IMG_3.jpg')"
        >
          <div class="parallax-content">
            <div class="content-card">
              <div class="text-white">
                <!-- Content here -->
                 <p>
                   
                 </p>
                 <DatePicker/>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="contact-section">
        
        <div
          class="parallax-item"
          style="background-image: url('/src/assets/images/IMG_4.jpg')"
        >
          <div class="parallax-content">
            <div class="content-card">
              <p>
                <!-- Your contact section content -->
              </p>
             
            </div>
            <Contact/>
          </div>
        </div>
       
      </section>
    </div>
  </template>
  
  <script>
import Contact from '../components/Contact.vue';
import DatePicker from '../components/DatePicker.vue';
import Navbar from '../components/Navbar.vue';
import TimePicker from '../components/TimePicker.vue';

 
  export default {
    name: "MainContent",
    components: {Navbar,TimePicker, DatePicker, Contact},
    data() {
      return {
        currentDate: new Date()
      };
    },
    computed: {
    formattedDate() {
      const day = String(this.currentDate.getDate()).padStart(2, '0');
      const month = String(this.currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
      const year = this.currentDate.getFullYear();
      return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
      }
    },
    methods: {
      // Your methods here
    }
  };
  </script>
  
  <style >

  
  .parallax-container {
    display: flex;
    flex-direction: column;
  }
  
  .parallax-item {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }
  
  
  .parallax-content {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .content-card {
    background-color: rgba(255, 255, 255, 0); /* Transparency for the content card */
    padding: 2rem;
    max-width: 600px;
    text-align: center;
  }
  
  h1 {
    font-size: 10vw;
    margin-bottom: 1rem;
    color: #ffffff;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }
  
  p {
    
    color: #ffffff;
  }
  </style>
  