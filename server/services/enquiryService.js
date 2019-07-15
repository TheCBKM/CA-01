var firebaseConfig = {
    apiKey: "AIzaSyAdW_Gxfk0NseV7d0iGnumbtzU81urQcWQ",
    authDomain: "jg-admin.firebaseapp.com",
    databaseURL: "https://jg-admin.firebaseio.com",
    projectId: "jg-admin",
    storageBucket: "",
    messagingSenderId: "164457989225",
    appId: "1:164457989225:web:ed31d9d175430711"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();


//service functions
function enquiry() {

    alert(name + email + message + contact);
}

function addEnquiry(name, email, contact, message) {
    return new Promise((resolve, reject) => {

        firebase.database().ref('admin/enquiry/' + Date.now()).set({
            name: name,
            email: email,
            contact: contact,
            message: message,
            date: new Date().toISOString(),
            read:false
        })
            .then(() => resolve({ data: "enquiry Added", success: true }))
            .catch(() => reject({ data: "Error in adding enquiry", success: false }))
    })

}


function getAllEnquiry() {
    return new Promise((resolve, reject) => {
        firebase.database().ref('admin/enquiry/').once('value')
            .then((snap) => {
                data = snap.val()
                keys = Object.keys(data)
                console.log("data")
                data = keys.map((k) => {
                    return data[k]
                })
                console.log(data)
                resolve(data)
            })
            .catch(e => reject(e))
    })
}