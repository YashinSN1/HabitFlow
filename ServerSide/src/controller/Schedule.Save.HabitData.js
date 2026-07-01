import { DateTime } from "luxon";

function getNow(tz) {
  return DateTime.now().setZone(tz);
}

console.log(getNow("Asia/Kolkata").toString());

export default getNow;