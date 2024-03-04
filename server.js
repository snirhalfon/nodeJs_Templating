const http = require("http"); // מייבא את מודול ה-HTTP שבנוי על הפרוטוקול HTTP
const app = require("./app"); // מייבא את האפליקציה שנמצאת בקובץ app.js
const port = 6060; // מגדיר את מספר הפורט שבו השרת יקשיב לבקשות

// יוצר את השרת ה-HTTP ומשתמש באפליקציה שייבאנו כדי לטפל בבקשות
const server = http.createServer(app);

// מגדיר את השרת להאזין על פורט מסוים ומציב callback להדפסת הפורט כאשר השרת מתחיל להאזין
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
