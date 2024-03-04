const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    //נשלוף את ההדר של האבטחה שנקרא אוטוריזישן
    const authHeader = req.headers.authorization;
    const arr = authHeader.split(" "); //יצירת מערך מחרוזת מתוך המחרוזת של האוטוריזיישן
    const token = arr[1]; //שמירת הטוקן בתוך המשתנה
    const user = jwt.verify(token, process.env.PRIVATE_KEY); //ביצענו בדיקת תקינות לטוקן במידה ותקין, נקבל את הערךהמוצפן
    req.user = user; //הוספת שדה משלנו לבקשה ובתוכו פרטי המשתמש
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "you are not authorized " }); //החזרת תשובה למשתמש שאינו מורשה גישה למקום זה
  }
};
