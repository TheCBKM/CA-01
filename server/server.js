function submitEnquiry() {
    name = document.getElementById('name').value;
    email = document.getElementById('email').value;
    message = document.getElementById('message').value;
    contact = document.getElementById('contact').value;
    addEnquiry(name, email, message, contact)
    window.location.reload();

}

function getEnquiry() {
    getAllEnquiry()
        .then(data => {
            tbody = document.getElementById("enquiry-tbody")
            data.map((d, i) => {
                tbody.innerHTML += `<tr>
                <th scope="row">${i + 1}</th>
                <td>${d.name}</td>
                <td>${d.contact}</td>
                <td>${d.email}</td>
                <td>${d.message}</td>
                <td>${d.date.split('T')[0]}</td>
                </tr>
                <tr>`
            })
        })
        .catch(e => {
            alert(e)
        })
}

function admLogin(){
    idadmin = document.getElementById('id-admin').value;
    passadmin = document.getElementById('pass-admin').value;
   alert("wer")
    window.location.href="admin.html"
}