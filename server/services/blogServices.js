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


function addBlog(heading,message,by) {
    return new Promise((resolve, reject) => {
        alert('jauga');
        firebase.database().ref('admin/blog/' + Date.now()).set({
            heading: heading,
            message: message,
            by: by, 
            date: new Date().toISOString(),
        })
            .then(() => resolve({ data: "blog Added", success: true }))
            .catch(() => reject({ data: "Error in adding blog", success: false }))
    })

}

function getBlog(id) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('admin/blog/' + id).once('value')
            .then((snap) => {
                data = snap.val()
                resolve(data)
            })
            .catch(e => reject(e))
    })
}

function getAllBlog() {
    return new Promise((resolve, reject) => {
        firebase.database().ref('admin/blog/').once('value')
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

function deleteBlog(id) {   
    return new Promise((resolve,reject)=>{
        getBlog(id)
        .then(data=>{
            if(data)
            firebase.database().ref('admin/blog/' + id).remove()
            .then(()=>{
             resolve({success:true,data:"blog Deleted"})
            })
            else
            reject({success:false,data:"no such blog found "})
 
        })
    })
}