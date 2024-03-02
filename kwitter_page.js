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
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code

        console.log(firebase_message_id);
        console.log(message_data);
        names = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];


        A1 = "<h4>" + names + "<img class='user_tick' src='tick.png'></h4>";
        A2 = "<h4 class='message_h4'>" + message + "</h4>";
        A3 = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick= 'updateLike(this.id)'>";
        A4 = "<span class='glyphicon glyphicon-thumbs-up'>  Like :  " + like + "</span></button><hr>";


        apple = A1 + A2 + A3 + A4;
        document.getElementById("output").innerHTML += apple;
        //End code
      }
    });
  });
}
getData();

function updateLike(message_id) {
  T1 = message_id;
  likes = document.getElementById(T1).value;
  updated_likes = Number(likes) + 1;

  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
  });

}
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}