import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCTlRdweba9PRymG9BNfjzrQyAkYf3y9MA",
    authDomain: "owl-in-the-tree-owner.firebaseapp.com",
    databaseURL: "https://owl-in-the-tree-owner.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;