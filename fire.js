import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
  import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAAS7kUYDEB4coXW3PKmj8FW95tLMBsmS0",
    authDomain: "landing-314b8.firebaseapp.com",
    databaseURL: "https://landing-314b8-default-rtdb.firebaseio.com",
    projectId: "landing-314b8",
    storageBucket: "landing-314b8.firebasestorage.app",
    messagingSenderId: "1087982281178",
    appId: "1:1087982281178:web:61c296f2fb55089e1820e3",
    measurementId: "G-N65F1Y7DKZ"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);

  async function logVisitorInfo() {
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipRes.json();

      const locationRes = await fetch(`https://ipapi.co/${ip}/json/`);
      const locationData = await locationRes.json();

      const visitorRef = ref(db, 'visitors');
      const newVisitor = push(visitorRef);
      
      await set(newVisitor, {
        ip,
        city: locationData.city,
        region: locationData.region,
        country: locationData.country_name,
        org: locationData.org,
        timestamp: new Date().toISOString()
      });

      console.log("Visitor logged:", ip);
    } catch (err) {
      console.error("Logging failed:", err);
    }
  }

  logVisitorInfo();