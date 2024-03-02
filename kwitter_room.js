
const firebaseConfig = {
      apiKey: "AIzaSyDynldAs_W93pD96EIz2H8vVI23EfmMhrI",
      authDomain: "kwitter-bade6.firebaseapp.com",
      databaseURL: "https://kwitter-bade6-default-rtdb.firebaseio.com",
      projectId: "kwitter-bade6",
      storageBucket: "kwitter-bade6.appspot.com",
      messagingSenderId: "402724587147",
      appId: "1:402724587147:web:3e62b9450496f6d345368e",
      measurementId: "G-S4K1JMQ5ND"
};
firebase.initializeApp(firebaseConfig);


function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("Room_names" + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  
            });
      });
}
getData();
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";
function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);

      window.location = "kwitter_page.html"
}
function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";

}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.locaton = "index.html";
}


