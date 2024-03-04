require("dotenv").config(); //טעינת קובץ ההגדרות למערכת
const express = require("express");
const app = express();
const hbs = require("express-handlebars");

const proRoute = require("./Api/v1/routes/product");
const categoryRote = require("./Api/v1/routes/category");
const userRoute = require("./Api/v1/routes/user");
const morgan = require("morgan");

//views
//הגדרת תיקיית התצוגה של המערכת
app.set("views", "./views");
//הגדרת מנוע תצוגות של הנדל ברסט
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs", //סיומת הקבצים השייכים למערכת התבניות
    defaultView: "index", //תצוגת ברירת המחדל שתוצג במידה ולא ציינו שם של תצוגה
    layoutsDir: __dirname + "/views/layouts", // הגדרת הנתיב לתיקית תבניות התצוגה -מאסטר פייג
    partialsDir: __dirname + "/views/partials", // הגדרת הנתיב לתיקייה של התצוגות החלקיות ,סוג של קומפוננטות תצוגה,יחידות תצוגה עצמאיות
  })
);

app.set("view engine", "hbs"); //פקודה שאומרת את מי אנחנו רוצים להפעיל
app.use(express.static("public")); // הגדרת התיקייה פאבליק כתיקיה סטאטית ממנה ניתן להגיש קבצים סטאטים שלא עוברים עיבוד בצד שרת כגון קבצי css js

app.get("/product", (req, res) => {
  const product = require("./Api/v1/models/product");
  product
    .find()
    .lean()
    .then((product) => {
      return res.status(200).render("product", {
        layout: "main",
        title: "my products",
        product,
      });
    });
});

app.get("/contact", (req, res) => {
  const product = require("./Api/v1/models/product");
  return res
    .status(200)
    .render("contact", { layout: "main", title: "my contact" });
});

const mongoose = require("mongoose"); //חיבור לספריית העבודה מונגו
mongoose.pluralize(null); //מבטל את הרביים
const mongoStore = require("connect-mongo"); //חיבור לספרייה

const connStr = process.env.MONGO_CONN; //שליפת מחרוזת ההתחברות מתוך הגדרות המערכת
console.log(connStr);
mongoose.connect(connStr + "DataBaseStore").then((status) => {
  if (status) {
    console.log("Connected to MongoDB");
  } else {
    console.log("Not connected to MongoDB");
  }
});

//ניצור מודל עבור מוצר

const userModel = require("./Api/v1/models/user");
userModel.find().then((data) => {
  console.log(data);
});

const productModel = require("./Api/v1/models/product");
const session = require("express-session");

productModel.find().then((data) => {
  //פונקצייה שמחזירה את כול הנתונים  כול הרשומות של הטבלה שאני עובד מולה כרגע עובדים מול פרודקט
  console.log(data);
});

let arr = ["198.161.2", "::1", "192.168.127.12"];
app.use((req, res, next) => {
  let i;
  for (i = 0; i < arr.length; i++) {
    if (req.ip === arr[i]) {
      break;
    }
  }
  if (i == arr.length) {
    return res.status(403).send("Forbidden");
  } else {
    next();
  }
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const twentymin = 1000 * 60 * 20;
app.use(
  session({
    secret: "HALFONsnir",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: twentymin,
    },
    store: mongoStore.create({
      mongoUrl: connStr + "SNIRdata",
    }),
  })
);
app.use("/category", categoryRote);
app.use("/product", proRoute);
app.use("/user", userRoute);

app.all("*", (req, res) => {
  return res.status(404).json({ msg: "Not Found" });
});

module.exports = app;
