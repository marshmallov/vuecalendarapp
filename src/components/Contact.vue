<template>
    <div class="contact-container">
      <div class="contact-details">
        <h2>Contact Us</h2>
        <p>
          We’d love to hear from you! Reach out to us via the details below or
          visit us at our location.
        </p>
        <p><strong>Address:</strong> 123 Main Street, Hometown, Country</p>
        <p><strong>Phone:</strong> +1 234 567 890</p>
        <p><strong>Email:</strong> contact@company.com</p>
        <div class="contact-buttons">
          <a
            href="tel:+1234567890"
            target="_blank"
            class="contact-button"
          >
            Call Us
          </a>
          <a
            href="mailto:contact@company.com"
            target="_blank"
            class="contact-button"
          >
            Email Us
          </a>
        </div>
      </div>
      <div class="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094336!2d144.95373631531652!3d-37.81720997975139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f3fdfbf5%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1634198016787!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    name: "Contact",
    components: {  }, 
    data() {
      return {
      };
    },
    mounted(){
    },
    methods: {
  },
}
  </script>
  
  <style scoped>
  .contact-container {
    z-index: 10;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
    gap: 20px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  
  .contact-details {
    flex: 1;
    min-width: 300px;
    max-width: 600px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .contact-details h2 {
    margin-bottom: 15px;
  }
  
  .contact-details p {
    margin-bottom: 10px;
    line-height: 1.5;
    color: #555;
  }
  
  .contact-buttons {
    margin-top: 20px;
  }
  
  .contact-button {
    display: inline-block;
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  
  .contact-button:hover {
    background-color: #0056b3;
  }
  
  .contact-map {
    flex: 1;
    min-width: 300px;
    height: 400px;
    background-color: #ddd;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  