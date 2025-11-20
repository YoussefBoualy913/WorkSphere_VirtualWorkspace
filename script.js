let workers = [], workersna = [];

let counteur;

// Save/load from localStorage
function loadData() {

    if (JSON.parse(localStorage.getItem('workers'))) {
        workers = JSON.parse(localStorage.getItem('workers'))
    }
    if (JSON.parse(localStorage.getItem('workersna'))) {
        workersna = JSON.parse(localStorage.getItem('workersna'))
    }
}


function saveData() {
    localStorage.setItem('workers', JSON.stringify(workers))
    localStorage.setItem('workersna', JSON.stringify(workersna))
}
// INITIALIZATION
function init() {
    loadData();
    showworker(workersna);
    handprofileActionClick();

    let maxid = 0;
    workers.forEach(et => {
        if (et.id > maxid) {
            maxid = et.id;
        }
    })
    counteur = maxid + 1;
}
document.addEventListener('DOMContentLoaded', init);


function addworker() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';

}
const btnsaveworker = document.querySelector('#saveworker');
document.querySelector('#add-new-worker').addEventListener('click', addworker)
btnsaveworker.addEventListener('click', (e) => {
    if (btnsaveworker.textContent == "Save worker") {
        const worker = validationworker(e)
        if (worker) {


            workers.push(worker);
            workersna.push(worker);
            saveData();

            showworker(workersna);
            handprofileActionClick();

            const modal = document.querySelector('.modal');
            modal.style.display = 'none';
        }
    }
})
const modaltitle = document.querySelector('#modal-title');
document.querySelector('.modal__close').addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
    document.getElementById('worker-form').reset();
    btnsaveworker.style = "none";
    btnsaveworker.textContent = "Save worker";
    modaltitle.textContent = "Add worker";
    document.querySelector('.cntinaireExpireince').innerHTML = '';
})
//validationworker function
function validationworker(e) {
    e.preventDefault();
    const workername = document.querySelector('#worker-name');
    const workerrole = document.querySelector('#worker-role');
    const workerimage = document.querySelector('#worker-image');
    const workeremail = document.querySelector('#worker-email');
    const workertele = document.querySelector('#worker-tel');
    const regexname = /^(?!\s*$)[A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.'-]{3,100}$/
    const regeximage = /^(?:https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?(?:\.(?:png|jpg|jpeg|gif|svg|webp))?\/?)?$/
    const regexsemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const regexstele = /^(?:\+212|0)([5-7])\d{8}$/
    const regexdate = /^\d{4}-\d{2}-\d{2}$/




    if (!regexname.test(workername.value)) {
        const nameerrors = document.querySelector('#name-errors')
        nameerrors.innerHTML = "name invalide!";
        nameerrors.style.color = 'red';
        workername.style.border = '1px solid red';
        return;

    }
    if (!regexname.test(workerrole.value)) {
        const roleerrors = document.querySelector('#role-errors')
        roleerrors.innerHTML = "role invalide!";
        roleerrors.style.color = 'red';
        workerrole.style.border = '1px solid red';
        return;

    }
    if (!regeximage.test(workerimage.value)) {
        const imageerrors = document.querySelector('#image-errors');
        imageerrors.innerHTML = "URL-image invalide!";
        imageerrors.style.color = 'red';
        workerimage.style.border = '1px solid red';
        return;

    }
    let expiriences = [];
    const Expireince = document.querySelectorAll('.Expireince');
    for (const Expir of Expireince) {

        if (Expir) {

            const Expireince__company = Expir.children[0].children[0].children[1];
            const Expireince__role = Expir.children[0].children[1].children[1];
            const Expireince__Dfrom = Expir.children[0].children[2].children[1];
            const Expireince__DTo = Expir.children[0].children[3].children[1];
            if (!regexname.test(Expireince__company.value)) {
                const componyerrors = Expireince__company.nextElementSibling;
                componyerrors.innerHTML = "company invalide! ";
                componyerrors.style.color = 'red';
                Expireince__company.style.border = '1px solid red';
                return;

            }
            if (!regexname.test(Expireince__role.value)) {
                const exproleerrors = Expireince__role.nextElementSibling;
                exproleerrors.innerHTML = "role invalide! ";
                exproleerrors.style.color = 'red';
                Expireince__role.style.border = '1px solid red';

                return;

            }
            if (!regexdate.test(Expireince__Dfrom.value)) {
                const Dfromerrors = Expireince__Dfrom.nextElementSibling;
                Dfromerrors.innerHTML = "datefrom invalide! ";
                Dfromerrors.style.color = 'red';
                Expireince__Dfrom.style.border = '1px solid red';
                return;

            }
            if (!regexdate.test(Expireince__DTo.value)) {
                const DToerrors = Expireince__DTo.nextElementSibling;
                DToerrors.innerHTML = "dateto invalide! ";
                DToerrors.style.color = 'red';
                Expireince__DTo.style.border = '1px solid red';
                return;

            }
            if (new Date(Expireince__DTo.value) <= new Date(Expireince__Dfrom.value)) {
                const DToerrors = Expireince__DTo.nextElementSibling;
                DToerrors.innerHTML = "dateTo doit etre superieur a dateFrom! ";
                DToerrors.style.color = 'red';
                Expireince__DTo.style.border = '1px solid red';
                return;
            }
            const expirience = {
                company: Expireince__company.value,
                exprole: Expireince__role.value,
                datefrom: Expireince__Dfrom.value,
                dateTo: Expireince__DTo.value,
            }
            expiriences.push(expirience);

        }
    }

    if (!regexsemail.test(workeremail.value)) {
        const emailerrors = document.querySelector('#email-errors')
        emailerrors.innerHTML = "email invalide! ";
        emailerrors.style.color = 'red';
        workeremail.style.border = '1px solid red';
        return;

    }

    if (!regexstele.test(workertele.value)) {
        const teleerrors = document.querySelector('#tele-errors');
        teleerrors.innerHTML = "telephone invalide! ";
        teleerrors.style.color = 'red';
        workertele.style.border = '1px solid red';
        return;

    }


    const worker = {
        id: counteur++,
        name: workername.value,
        role: workerrole.value,
        image: workerimage.value || "https://avatar.iran.liara.run/public",
        email: workeremail.value,
        telephone: workertele.value,
        expirience: expiriences

    }
    document.getElementById('worker-form').reset();
    return worker;

}
//remove errur message
function removeErrurmessage() {
    const input = document.querySelectorAll('.input');
    input.forEach(inp => {
        inp.addEventListener('focus', (e) => {
            e.target.style = 'none';
            e.target.nextElementSibling.innerHTML = "";

        })
    })
}
removeErrurmessage();
//add experience  function
function addexperience() {
    const cntinaireExpireince = document.querySelector('.cntinaireExpireince');
    cntinaireExpireince.insertAdjacentHTML('beforeend', `
    
     <div class="Expireince bg-gray-100  p-5 rounded-sm shadow-md">
                                <div class="form__group flex flex-col gap-1 ">
                                     <div class="flex flex-col gap-1">
                                    <label class="form__label text-sm" for="worker-name">Company:</label>
                                    <input type="text" id="company"
                                        class="input border border-gray-300 p-1 rounded-sm outline-none focus:border-blue-500 bg-white"
                                        placeholder="Enter worker name">
                                         <div class="errors text-xs" id="company-errors"></div>
                                     </div>
                                     <div class="flex flex-col gap-1">
                                    <label class="form__label text-sm" for="worker-name">Role:</label>
                                    <input type="text" id="exprole"
                                        class="input border border-gray-300 p-1 rounded-sm outline-none focus:border-blue-500 bg-white"
                                        placeholder="Enter role expirience worker">
                                         <div class="errors text-xs" id="exprole-errors"></div>
                                     </div>
                                     <div class="flex flex-col gap-1">
                                    <label class="form__label text-sm" for="worker-name">From:</label>
                                    <input type="date" id="Dfrom"
                                        class="input border border-gray-300 p-1 rounded-sm outline-none focus:border-blue-500 bg-white"
                                        placeholder="Enter worker name">
                                         <div class="errors text-xs" id="Dfrom-errors"></div>
                                      </div>
                                      <div class="flex flex-col gap-1">
                                    <label class="form__label text-sm" for="worker-name">To:</label>
                                    <input type="date" id="DTo"
                                        class="input border border-gray-300 p-1 rounded-sm outline-none focus:border-blue-500 bg-white"
                                        placeholder="Enter worker name" >
                                         <div class="errors text-xs" id="DTo-errors"></div>
                                         </div>
                                </div>

                            </div>`)


    removeErrurmessage();
}
document.querySelector('.addExperience').addEventListener('click', addexperience)

//showimage in form
const workerimage = document.getElementById('worker-image')
workerimage.addEventListener('input', () => {
    if (workerimage.value) {
        document.getElementById('show-image').innerHTML = `
<img src='${workerimage.value}' width="100px" height="100px" class="">
`
    }
    if (!workerimage.value) {
        document.getElementById('show-image').innerHTML = '';
    }
})

//showworker function
function showworker(workerna) {

    const staf = document.getElementById('staf');
    staf.innerHTML = '';

    workerna.forEach(work => {
        staf.innerHTML += `
     <div class="profil flex p-2 border rounded-md gap-3 bg-neutral-50 text-base shadow-md border-gray-200" data-btn="detaile" data-id="${work.id}">
                            <img src="${work.image}" alt="" class="profil-image rounded-3xl" width="40" height="50">
                            <div class="flex flex-col justify-center">
                                <p class="name text-sm">${work.name}</p>
                                <p class="role text-xs">${work.role}</p>
                            </div>
                            <button class="btnedit m-auto text-amber-500" data-btn="edit" data-id="${work.id}">Edit</button>
                        </div>
    `
    })
}



//addworkerroom function
function addworkerroom(room) {
    const choix = room;
    switch (choix) {
        case "conference":
            showWorkerinmodal(workersna, choix);
            break;
        case "reception":
            const workerreception = workersna.filter(work => work.role == "Receptionist" || work.role == "Cleaning" || work.role == "Manager")

            showWorkerinmodal(workerreception, choix);
            break;
        case "servers":
            const workerservers = workersna.filter(work => work.role == "IT Guy" || work.role == "Cleaning" || work.role == "Manager")

            showWorkerinmodal(workerservers, choix);
            break;
        case "security":
            const workersecurity = workersna.filter(work => work.role == "security" || work.role == "Cleaning" || work.role == "Manager")

            showWorkerinmodal(workersecurity, choix);
            break;
        case "staff":


            showWorkerinmodal(workersna, choix);
            break;
        case "vault":
            const workervault = workersna.filter(work => work.role != "Cleaning")
            showWorkerinmodal(workervault, choix);
            break;


    }
    document.getElementById('assingmodal').style.display = 'flex';

}
//showWorkerinmodal function
function showWorkerinmodal(ws, choix) {
    console.log(ws);
    
    const modelworker = document.getElementById('modal-woker');
    modelworker.innerHTML = '';

    ws.forEach(work => {

        modelworker.innerHTML += `
     <div class="worker flex p-2 border rounded-md gap-3 bg-neutral-50 text-base shadow-md border-gray-200" 
              data-id="${work.id}" data-room="${choix}" onclick='assingworker(this.dataset.room,this.dataset.id)'>
            <img src="${work.image}" alt="" class="profil-image rounded-3xl" width="40" height="50">
            <div class="flex flex-col justify-center">
                <p class="name text-sm">${work.name}</p>
                <p class="role text-xs">${work.role}</p>
            </div>
                           
    </div> 
    `

    })
}

document.getElementById('closeassing').addEventListener('click', () => {
    document.getElementById('assingmodal').style.display = 'none';
})

//assingworker function
function assingworker(choix,id) {
    console.log(workersna);

    const workeras = workersna.filter(work => work.id == Number(id));

    const index = workersna.indexOf(workeras[0]);


    switch (choix) {
        case "conference":
            const conferenceroom = document.getElementById('conference-room-worker');
            show_assig_inroom(workeras, conferenceroom);
            workersna.splice(index, 1);
            showworker(workersna);
            document.getElementById('assingmodal').style.display = 'none';
            break;

        case "reception":

            const receptionroom = document.getElementById('reception-room-worker');
            show_assig_inroom(workeras, receptionroom);
            workersna.splice(index, 1);
            showworker(workersna);
            document.getElementById('assingmodal').style.display = 'none';
            break;
        case "servers":

            const serversroom = document.getElementById('servers-room-worker');
            show_assig_inroom(workeras, serversroom);
            workersna.splice(index, 1);
            showworker(workersna);
            document.getElementById('assingmodal').style.display = 'none';
            break;
        case "security":

            const securityroom = document.getElementById('security-room-worker');
            show_assig_inroom(workeras, securityroom);
            workersna.splice(index, 1);
            showworker(workersna);
            document.getElementById('assingmodal').style.display = 'none';
            break;
        case "staff":

            const staffroom = document.getElementById('staff-room-worker');
            show_assig_inroom(workeras, staffroom);
            workersna.splice(index, 1);
            showworker(workersna);
            document.getElementById('assingmodal').style.display = 'none';
            break;
        case "vault":

            const vaultroom = document.getElementById('vault-room-worker');
            show_assig_inroom(workeras, vaultroom);
            workersna.splice(index, 1);
            showworker(workersna);
            document.getElementById('assingmodal').style.display = 'none';
            break;
    }
}
//show_assig_inroom function
function show_assig_inroom(workeras, assingin) {
    assingin.innerHTML += `
            <div class="worker flex  p-2 border rounded-md gap-3 bg-neutral-50 text-base shadow-md border-gray-200 w-[40%]">
                <img src="" alt="${workeras[0].image}" class="profil-image rounded-3xl" width="30" height="30">
                <div class="flex flex-col justify-center">
                     <p class="name text-xs">${workeras[0].name}</p>
                    <p class="role text-xs">${workeras[0].role}</p>
                </div>
                <button class="btnx m-auto border pl-0.5 pr-0.5 rounded-2xl  flex justify-center items-center text-white"><span>x</span></button>
            </div> 

      `
}

//handprofileActionClick function
function handprofileActionClick(){
const profil = document.querySelectorAll('.profil');
profil.forEach(pro=>{
    pro.addEventListener('click', (e) =>{
        if( e.target.dataset.btn=="edit"){
        
            
         const  workerid = e.target.dataset.id;
         editWorker(workerid);
    }else{
         const  workerid = e.target.dataset.id;
          detailWorker(workerid);
        }
       
         
    
    })
})
}
//editEvent function

function editWorker(wid) {
 
    workersna.forEach(work => {
        if (work.id == wid) {
            index = workersna.indexOf(work);

        }
    })
    const form = document.querySelector('#worker-form');
    const cntinaireExpireince = document.querySelector('.cntinaireExpireince');
   
    
    form.querySelector('#worker-name').value = workersna[index].name;
    form.querySelector('#worker-role').value = workersna[index].role;
    form.querySelector('#worker-image').value = workersna[index].image;
    form.querySelector('#worker-email').value = workersna[index].email;
    form.querySelector('#worker-tel').value = workersna[index].telephone;

    if (workersna[index].expirience) {
        cntinaireExpireince.innerHTML = '';
        workersna[index].expirience.forEach((work) => {

            cntinaireExpireince.insertAdjacentHTML('beforeend', `
    <div class="Expireince bg-gray-100  p-5 rounded-sm shadow-md">
                                <div class="form__group flex flex-col gap-1 ">
                                     <div class="flex flex-col gap-1">
                                    <label class="form__label text-sm" for="worker-name">Company:</label>
                                    <input type="text" id="company" value="${work.company}"
                                        class="input border border-gray-300 p-1 rounded-sm outline-none focus:border-blue-500 bg-white"
                                        placeholder="Enter worker name">
                                         <div class="errors text-xs" id="company-errors"></div>
                                     </div>
                                     <div class="flex flex-col gap-1">
                                    <label class="form__label text-sm" for="worker-name">Role:</label>
                                    <input type="text" id="exprole" value="${work.exprole}"
                                        class="input border border-gray-300 p-1 rounded-sm outline-none focus:border-blue-500 bg-white"
                                        placeholder="Enter role expirience worker">
                                         <div class="errors text-xs" id="exprole-errors"></div>
                                     </div>
                                     <div class="flex flex-col gap-1">
                                    <label class="form__label text-sm" for="worker-name">From:</label>
                                    <input type="date" id="Dfrom" value="${work.datefrom}"
                                        class="input border border-gray-300 p-1 rounded-sm outline-none focus:border-blue-500 bg-white"
                                        placeholder="Enter worker name">
                                         <div class="errors text-xs" id="Dfrom-errors"></div>
                                      </div>
                                      <div class="flex flex-col gap-1">
                                    <label class="form__label text-sm" for="worker-name">To:</label>
                                    <input type="date" id="DTo" value="${work.dateTo}"
                                        class="input border border-gray-300 p-1 rounded-sm outline-none focus:border-blue-500 bg-white"
                                        placeholder="Enter worker name" >
                                         <div class="errors text-xs" id="DTo-errors"></div>
                                         </div>
                                </div>

                            </div>
`)

        })

    }

    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';

    const btnedit = document.querySelector('#saveworker');
    btnedit.textContent = "Edit";
    btnedit.style.backgroundColor = "orange";
    modaltitle.textContent = "Edit worker";
    btnedit.addEventListener('click', (e) => {

        if (btnedit.textContent == "Edit") {
            let worker = validationworker(e);
            worker.id = workersna[index].id;
            workersna[index] = worker;

            btnedit.textContent = "Save worker";
            modaltitle.textContent = "Add worker";
            modal.style.display = 'none';
            btnedit.style = "none";
            saveData();
            showworker(workersna);
        }

    })

}
