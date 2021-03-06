// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment-timezone';

const SECRET_PASSWORD = "I-love-you <3";
const PASSWORD = "Počkej, až příjde správný čas."
const GOALTIME = "2020-09-10 16:00:10";

export default (req, res) => {
  var password = "Ještě chvíli vydrž :-)";
  var received = false;
  var currentTime = moment.tz("Europe/Prague");
  if (!currentTime.isBefore(moment.tz(GOALTIME, "Europe/Prague"))) {
    password = SECRET_PASSWORD;
    received = true;
  }
  res.statusCode = 200
  res.json({ password: password, received: received, currentTime: currentTime.format()})
}
