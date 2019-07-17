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

function getEnquiry(id) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('admin/enquiry/' + id).once('value')
            .then((snap) => {
                data = snap.val()
                resolve(data)
            })
            .catch(e => reject(e))
    })
}

function getAllEnquiry() {
    return new Promise((resolve, reject) => {
        firebase.database().ref('admin/enquiry/').once('value')
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

function deleteEnquiry(id) {   
    return new Promise((resolve,reject)=>{
        getEnquiry(id)
        .then(data=>{
            if(data)
            firebase.database().ref('admin/enquiry/' + id).remove()
            .then(()=>{
             resolve({success:true,data:"enquiry Deleted"})
            })
            else
            reject({success:false,data:"no such enquiry found "})
 
        })
    })
}