import firebase from "firebase-admin";
import moment from "moment";

import firestoreKey from "../../firestoreKey.json";

export default async function(param, result) {
  firebase.initializeApp({
    credential: firebase.credential.cert(firestoreKey)
  });
  const db = firebase.firestore().collection("schedule");
  const startOfWeek = moment()
    .startOf("isoWeek")
    .add(-1, "day");
  const next =
    moment().toISOString() === startOfWeek.toISOString()
      ? moment()
      : moment()
          .startOf("isoWeek")
          .add(1, "week")
          .add(-1, "day");

  const schedule = await db.get();
  schedule.docs.forEach(i => {
    const temp = i.data();
    const scd = moment.unix(temp.when._seconds).format("DD/MM/YYYY");
    console.log(scd, temp.movieTitle, temp.curator);
  });

  return result;
}
