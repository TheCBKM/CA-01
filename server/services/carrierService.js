
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
    if (name && email && contact && fileButton) {
        file = fileButton.files[0];
        ext = file.name.split('.')[file.name.split('.').length - 1]
        fname=`${Date.now()}.${ext}`
        var storageRef = firebase.storage().ref('JG/' +fname );
        storageRef.put(file).then(function (snapshot) {
            addCarrier(name, email, contact, fname)
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

function getAllCarrier() {
   // firebase.initializeApp(firebaseConfig);

    return new Promise((resolve, reject) => {
        firebase.database().ref('admin/carrier/').once('value')
            .then((snap) => {
                data = snap.val()
                keys = Object.keys(data)
                console.log(keys)
                data = keys.map((k,i) => {
                   data[k].id=k
                    return data[k]
                })
                console.log(data)
                resolve(data)
            })
            .catch(e => reject(e))
    })
}

function getCar() {
    getAllCarrier()
        .then(data => {
            tbody = document.getElementById("enquiry-tbody")
            tbody.innerHTML = ""
            data.map((d, i) => {
                tbody.innerHTML += `<tr>
                <th scope="row">${i + 1}</th>
                <td>${d.name}</td>
                <td>${d.contact}</td>
                <td>${d.email}</td>
                <td><button class="btn btn-primary" onclick=download("${d.fname}")>Check</button></td>
                <td>${d.date.split('T')[0]}</td>
                
                </tr>
                <tr>`
            })
        })
        .catch(e => {
            alert(e)
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
        window.location.href=url;
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