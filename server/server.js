function submitEnquiry() {
    name = document.getElementById('name').value;
    email = document.getElementById('email').value;
    message = document.getElementById('message').value;
    contact = document.getElementById('contact').value;
    addEnquiry(name, email, message, contact)


}

function getEnq() {
    getAllEnquiry()
        .then(data => {
            tbody = document.getElementById("enquiry-tbody")
            tbody.innerHTML = ""
            data.map((d, i) => {
                tbody.innerHTML += `<tr>
                <th scope="row">${i + 1}</th>
                <td>${d.name}</td>
                <td>${d.contact}</td>
                <td>${d.email}</td>
                <td>${d.message}</td>
                <td>${d.date.split('T')[0]}</td>
                <td><button onclick=delEnq("${d.id}")>Delete</button></td>
                </tr>
                <tr>`
            })
        })
        .catch(e => {
            alert(e)
        })
}

function getBlg() {
    getAllBlog()
        .then(data => {
            tbody = document.getElementById("blog-tbody")
            tbody.innerHTML = ""
            data.map((d, i) => {
                tbody.innerHTML += `<tr>
                <th scope="row">${i + 1}</th>
                <td>${d.heading}</td>
                <td><button onclick=editBlg("${d.id}")>Edit</button></td>
                <td><button onclick=delBlg("${d.id}")>Delete</button></td>
                <td>${d.date.split('T')[0]}</td>
                </tr>
                <tr>`
            })
        })
        .catch(e => {
            alert(e)
        })
}

function delEnq(id) {
    deleteEnquiry(id);
    getEnq();
    
}

function delBlg(id) {
    alert('delete');
    deleteBlog(id);
    getBlg();
}


function submitBlog() {
    hd = document.getElementById('blog-head').value;
    mg = document.getElementById('blog-msg').value;
    by = document.getElementById('blog-by').value;
    alert(hd + '==' + mg + '==' + by);
    addBlog(hd, mg, by);

}

function getBg() {
    getAllBlog()
        .then(data => {
            rbody = document.getElementById("blog-row")
            rbody.innerHTML = ""
            data.map((d, i) => {

                if (d.message.length > 230)
                    var tmsg = d.message.substr(0, 230) + ' .....read more';
                else
                    var tmsg = d.message;

                rbody.innerHTML += `<div class="fancy-cards md-4">
            <div class="fancy-card">
                <div class="top">
                    <div style="padding-top:10px; white-space:pre-line; color:rgb(247, 243, 242);">${tmsg}</div>
                    <div class="caption">
                        <h3 class="title">${d.heading}</h3>
                        <button  class="button" data-toggle="modal" data-target="#example${d.id}">Read More </button>
                    </div>
                </div>
                <div class="middle"></div>
                <div class="bottom"></div>
            </div>
        </div>
        
     

<!-- Modal -->
<div class="modal fade" id="example${d.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${d.heading}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="white-space:pre-line" >
        ${d.message}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
        `
            })
        })
        .catch(e => {
            alert(e)
        })
}


function logout(){
    alert('logout');
    localStorage.removeItem('log');
    window.location.reload();
}

function verify(n) {
    if (localStorage.getItem("log") === "yes") {
        if(n==1)
            getEnq();
        else if(n==3)
            getBlg();
        else if(n==4)
            updateBlg();
        
    }
    else{
        window.location.href="admin-login.html"
    }
}

function adminLogin() {
    var idadmin = document.getElementById("id-admin").value
    var passadmin = document.getElementById("pass-admin").value
    if(idadmin==="123456"&&passadmin==="123456"){
        localStorage.setItem("log", "yes");
    window.location.href = "enquiry-admin.html"
    }
    else{
        alert("wrong details")
    }
   
}

function editBlg(id){
    window.location.href = 'editblog-admin.html?id='+id;
}

function updateBlg(){
    qrStr = window.location.search;
    id=qrStr.split("=")[1];
    alert(id);
    getBlog(id).then(data=>{
        console.log(data);
        document.getElementById('blogedit-heading').value = data.heading;
        document.getElementById('blogedit-message').value = data.message;
        document.getElementById('blogedit-by').value = data.by;

    }).catch(e=>{
        alert(e);
    })
}

function submitEditBlog(){
    qrStr = window.location.search;
    id=qrStr.split("=")[1];
    message = document.getElementById('blogedit-message').value;
    heading = document.getElementById('blogedit-heading').value;
    by = document.getElementById('blogedit-by').value;

    alert(id+'=='+message+'=='+by+'=='+heading);
    updateBlog(id,heading,message,by);
    window.location.href='blogview-admin.html';

}