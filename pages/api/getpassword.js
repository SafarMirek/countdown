// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment-timezone';

const PASSWORD = "I-love-you <3";
const GOALTIME = "2020-08-19 16:00:10";

export default (req, res) => {
  var password = "Ještě chvíli vydrž :-)";
  var received = false;
  var currentTime = moment.tz("Europe/Prague");
  if (!currentTime.isBefore(moment.tz(GOALTIME, "Europe/Prague"))) {
    password = PASSWORD;
    received = true;
  }
  res.statusCode = 200
  res.json({ password: password, received: received, currentTime: currentTime.format()})
}
