
//bigdata2021s@gmail.com
// connect https://console.firebase.google.com/u/0/project/packagemanager-214c6/firestore/data/~2Fpackages~2F08d6a36d-b89b-497a-9692-640d3f5bd2fa
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require("./firebaseCredentials.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = {
  db
}