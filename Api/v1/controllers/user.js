const user = require("../models/user"); //חיבור למודל של המוצרים
const bcrypt = require("bcrypt"); //קישור לספריית ההצפנה
const jwt = require("jsonwebtoken"); //חיבור לספריית jwk
module.exports = {
  login: (req, res) => {
    const { email, pass } = req.body;
    user.find({ email }).then((results) => {
      if (results.length == 0)
        //במידה והמייל לא נמצא במערכת
        return res.status(200).json({ msg: "user or pass are wrong" });

      const hashpass = results[0].pass; //שליפת המחרוזת המחוצפנת שנקבלה מתוך בסיס הנתונים

      bcrypt.compare(pass, hashpass).then((status) => {
        if (!status) {
          return res.status(200).json({ msg: "user or pass are wrong" }); //מחזירים הודעת שגיאה
        } else {
          const myUser = results[0];
          const token = jwt.sign(
            { email, pass, fullname: myUser.fullname },
            process.env.PRIVATE_KEY,
            { expiresIn: "1h" }
          );
          req.session.user = token; //
          return res.status(200).json({ msg: "login success", token }); //המחזירים הודעת התחברת בהצלחה
        }
      });
    });
  },

  register: (req, res) => {
    const { userId, fullname, email, pass, phone } = req.body; // שליפת השדות שנשלחו בבקשה

    user.find({ email }).then((results) => {
      if (results.length > 0) {
        return res.status(200).json({ msg: "user already exsisted" });
      } else {
        // הצפנת סיסמה
        bcrypt.hash(pass, 10).then((hashPass) => {
          // שמירה בבסיס נתונים של המשתמש
          user
            .insertMany({ userId, fullname, email, pass: hashPass, phone })
            .then((results) => {
              return res.status(200).json({ results });
            });
        });
      }
    });
  },

  getAllUser: (req, res) => {
    user.find().then((data) => {
      return res.status(200).json(data);
    });
  },
  getUserById: (req, res) => {
    let userId = req.params.id;
    user.findOne({ userId }).then((data) => {
      return res.status(200).json(data);
    });
  },
  addUser: (req, res) => {
    let body = req.body;
    user.insertMany([body]).then((data) => {
      return res.status(200).json(data);
    });
  },
  updateUser: (req, res) => {
    let userId = req.params.id;
    let body = req.body;
    user.updateOne({ userId }, body).then((date) => {
      return res.status(200).json(date);
    });
  },
  deleteUser: (req, res) => {
    let userId = req.params.id;
    user.deleteOne({ userId }).then((data) => {
      return res.status(200).json(data);
    });
  },
};
