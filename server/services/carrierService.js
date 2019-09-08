function submitCarrier() {
    alert('Hello')
    name = document.getElementById('name').value;
    email = document.getElementById('email').value;
    contact = document.getElementById('contact').value;
    fileButton = document.getElementById('file');
    file = fileButton.files[0];
    alert(file)
    var storageRef = firebase.storage().ref('JG/'+file.name);
    storageRef.put(file);
    alert('qwerty');
  // addCarrier(name, email, contact, file.name)


}


function myFunction() {
var fileButton = document.getElementById("fileButton");
var file = fileButton.files[0];
alert(file)
alert('hello')
var storageRef = firebase.storage().ref('JG/'+file.name);
storageRef.put(file);
alert('123')
}


function addCarrier(name, email, contact, fname) {
    alert('doing')
    return new Promise((resolve, reject) => {

        firebase.database().ref('admin/carrier/' + Date.now()).set({
            name: name,
            email: email,
            contact: contact,
            fname: fname,
            date: new Date().toISOString(),
            read:false
        })
            .then(() => resolve({ data: "enquiry Added", success: true }))
            .catch(() => reject({ data: "Error in adding enquiry", success: false }))
    })

}

function delt(file){
// Create a reference to the file to delete
var storageRef = firebase.storage().ref('JG');

var desertRef = storageRef.child(file);

// Delete the file
desertRef.delete().then(function() {
// File deleted successfully
alert('success')
}).catch(function(error) {
// Uh-oh, an error occurred!
});
alert('1');

}

function download(file){
var storageRef = firebase.storage().ref('JG');

// Create a reference to the file we want to download
var starsRef = storageRef.child(file);

// Get the download URL
starsRef.getDownloadURL().then(function(url) {
console.log(url)
// Insert url into an <img> tag to "download"
}).catch(function(error) {

// A full list of error codes is available at
// https://firebase.google.com/docs/storage/web/handle-errors
console.log(error.code)
switch (error.code) {
case 'storage/object-not-found':
alert('1')
// File doesn't exist
break;

case 'storage/unauthorized':
alert('2')
// User doesn't have permission to access the object
break;

case 'storage/canceled':
alert('3')
// User canceled the upload
break;

case 'storage/unknown':
alert('4')
// Unknown error occurred, inspect the server response
break;
}
});

}