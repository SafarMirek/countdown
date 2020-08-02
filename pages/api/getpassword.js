// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment';

const PASSWORD = "I-love-you <3";
const GOALTIME = "2020-08-19 16:00:10";

export default (req, res) => {
  var password = "Ještě chvíli vydrž :-)";
  var received = false;
  if (!moment().isBefore(GOALTIME)) {
    password = PASSWORD;
    received = true;
  }
  res.statusCode = 200
  res.json({ password: password, received: received})
}
