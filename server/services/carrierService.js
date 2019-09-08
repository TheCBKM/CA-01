
var config = {
    apiKey: "AIzaSyAdW_Gxfk0NseV7d0iGnumbtzU81urQcWQ",
    authDomain: "jg-admin.firebaseapp.com",
    databaseURL: "https://jg-admin.firebaseio.com",
    projectId: "jg-admin",
    storageBucket: "jg-admin.appspot.com",
    messagingSenderId: "164457989225",
    appId: "1:164457989225:web:ed31d9d175430711"
};
firebase.initializeApp(config);
const database = firebase.database();

function submitCarrier() {
    document.getElementById("submitload").innerHTML=`<div class="lds-dual-ring"></div>`
    name = document.getElementById('name').value;
    email = document.getElementById('email').value;
    contact = document.getElementById('contact').value;
    fileButton = document.getElementById('file');
    var blob = file.files[0].slice(0, fileButton.files[0].size, 'image/png');
    if (name && email && contact && fileButton) {
        file = fileButton.files[0];
        ext = file.name.split('.')[file.name.split('.').length - 1]
        newFile = new File([blob], `${Date.now()}.${ext}`, { type: 'image/png' });
        var storageRef = firebase.storage().ref('JG/' + newFile.name);
        storageRef.put(newFile).then(function (snapshot) {
            addCarrier(name, email, contact, newFile.name)
            alert("Thank you for Submiting")
            window.location.reload()
        });
        ;


    }
    else {
        alert("Please enter all values")
    }


}



function addCarrier(name, email, contact, fname) {
    
    return new Promise((resolve, reject) => {

        firebase.database().ref('admin/carrier/' + Date.now()).set({
            name: name,
            email: email,
            contact: contact,
            fname: fname,
            date: new Date().toISOString(),
            read: false
        })
            .then(() => resolve({ data: "enquiry Added", success: true }))
            .catch(() => reject({ data: "Error in adding enquiry", success: false }))
    })

}

function delt(file) {
    // Create a reference to the file to delete
    var storageRef = firebase.storage().ref('JG');

    var desertRef = storageRef.child(file);

    // Delete the file
    desertRef.delete().then(function () {
        // File deleted successfully
        alert('success')
    }).catch(function (error) {
        // Uh-oh, an error occurred!
    });
    alert('1');

}

function download(file) {
    var storageRef = firebase.storage().ref('JG');

    // Create a reference to the file we want to download
    var starsRef = storageRef.child(file);

    // Get the download URL
    starsRef.getDownloadURL().then(function (url) {
        console.log(url)
        // Insert url into an <img> tag to "download"
    }).catch(function (error) {

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