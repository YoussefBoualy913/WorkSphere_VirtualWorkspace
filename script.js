let workers = [], workersna = [];
let counteur;

// ==============================
// Save/load from localStorage
// ==============================

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

// ================
// INITIALIZATION
// ================

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
    Init_showWorker_inroom();
}
document.addEventListener('DOMContentLoaded', init);

// ===============
// addworker
// ===============

function addworker() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';

}
// ===================
//save worker
// ===================

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
const formltitle = document.querySelector('#form-title');
const modaltitle = document.querySelector('#modal-title');
document.querySelector('.modal__close').addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
    document.getElementById('worker-form').reset();
    btnsaveworker.style = "none";
    btnsaveworker.textContent = "Save worker";
    formltitle.textContent = "Add worker";
    formltitle.style = "none";
    document.querySelector('.cntinaireExpireince').innerHTML = '';
    modaltitle.textContent = "Select Worker to Assing";
})

// =========================
//validationworker function
// =========================

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
        expirience: expiriences,
        room: null

    }
    document.getElementById('worker-form').reset();
    return worker;

}
//====================
//remove errur message
// ===================
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

// ========================
//add experience  function
// ========================

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

// =================
//showimage in form
// ==================

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

// ===================
//showworker function
// ===================

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


// =====================
//addworkerroom function
// =====================

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

// =========================
//showWorkerinmodal function
// =========================

function showWorkerinmodal(ws, choix) {
    console.log(ws);

    const modelworker = document.getElementById('modal-woker');
    modelworker.innerHTML = '';

    ws.forEach(work => {

        modelworker.innerHTML += `
     <div class=" flex p-2 border rounded-md gap-3 bg-neutral-50 text-base shadow-md border-gray-200" 
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

// =====================
//assingworker function
// =======================

function assingworker(choix, id) {

    switch (choix) {
        case "conference":
            const conferenceroom = document.getElementById('conference-room-worker');
            let nobreroomconf = 0;
            workers.forEach(work => {
                if (work.room == "conference") {
                    nobreroomconf++;
                }
            })
            if (nobreroomconf <= 3) {
                show_assig_inroom(conferenceroom, choix,id);
              
            } else {
                window.alert("Zoon n'accepte pas plus 4 workers");
            }
            break;

        case "reception":

            const receptionroom = document.getElementById('reception-room-worker');
            let nobreroomrec = 0;
            workers.forEach(work => {
                if (work.room == "reception") {
                    nobreroomrec++;
                }
            })
            if (nobreroomrec <= 2) {
                show_assig_inroom(receptionroom, choix,id);
                
            } else {
                window.alert("Zoon n'accepte pas plus 3 workers");
            }

            break;
        case "servers":

            const serversroom = document.getElementById('servers-room-worker');
            let nobreroomserv = 0;
            workers.forEach(work => {
                if (work.room == "servers") {
                    nobreroomserv++;
                }
            })

            if (nobreroomserv <= 2) {
                show_assig_inroom(serversroom, choix,id);
               
            } else {
                window.alert("Zoon n'accepte pas plus 3 workers");
            }

            break;
        case "security":

            const securityroom = document.getElementById('security-room-worker');
            let nobreroomsecu = 0;
            workers.forEach(work => {
                if (work.room == "security") {
                    nobreroomsecu++;
                }
            })
            if (nobreroomsecu <= 2) {
                show_assig_inroom(securityroom, choix,id);
            } else {
                window.alert("Zoon n'accepte pas plus 3 workers");
            }

            break;
        case "staff":

            const staffroom = document.getElementById('staff-room-worker');
            let nobreroomstaf = 0;
            workers.forEach(work => {
                if (work.room == "staff") {
                    nobreroomstaf++;
                }
            })
            if (nobreroomstaf <= 2) {
                show_assig_inroom(staffroom, choix,id);
            
            } else {
                window.alert("Zoon n'accepte pas plus 3 workers");
            }


            break;
        case "vault":

            const vaultroom = document.getElementById('vault-room-worker');
            let nobreroomvaul = 0;
            workers.forEach(work => {
                if (work.room == "vault") {
                    nobreroomvaul++;
                }
            })
            if (nobreroomvaul <= 2) {
                show_assig_inroom(vaultroom, choix,id);
            } else {
                window.alert("Zoon n'accepte pas plus 3 workers");
            }

            break;
    }
}

// ==========================
//show_assig_inroom function
// ===========================

function show_assig_inroom(assingin, room ,id) {

     const workeras = workersna.filter(work => work.id == Number(id));
    const index = workersna.indexOf(workeras[0]);


    
        workeras[0].room = room;
        workers.forEach(work => {
            if (workeras[0].id == work.id) {
                work.room = workeras[0].room;
            }
        })
        assingin.innerHTML += `
            <div class="profil worker flex  p-2 border rounded-md gap-3 bg-neutral-50 text-base shadow-md
             border-gray-200 w-[40%]" data-btn="details" data-id="${workeras[0].id}">
                <img src="${workeras[0].image}" alt="" class="profil-image rounded-3xl" width="30" height="30">
                <div class="flex flex-col justify-center">
                     <p class="name text-xs">${workeras[0].name}</p>
                    <p class="role text-xs">${workeras[0].role}</p>
                </div>
                <button class="btnx m-auto border pl-0.5 pr-0.5 rounded-2xl flex justify-center items-center w-2
                 text-white dellet"><span  data-btn="dellet" data-id="${workeras[0].id}">x</span></button>
            </div> 

      `
       workersna.splice(index, 1);
       showworker(workersna);
       document.getElementById('assingmodal').style.display = 'none';
       assingin.parentElement.classList.remove("roombg");
        handprofileActionClick();
      saveData();

}
// ===============================
//handprofileActionClick function
// ===============================
function handprofileActionClick() {
    const profil = document.querySelectorAll('.profil');

    profil.forEach(pro => {

        pro.addEventListener('click', (e) => {
            console.log("hilkjhgoooo2");

            if (e.target.dataset.btn === "edit") {


                const workerid = e.target.dataset.id;
                editWorker(workerid);
            } else if (e.target.dataset.btn === "dellet") {

                const workerid = e.target.dataset.id;

                const assingine = e.target.parentElement.parentElement.parentElement;
                e.target.parentElement.parentElement.remove();

                delettsWorker(workerid, assingine);
            }
            else {

                const workerid = e.currentTarget.dataset.id;
                detailWorker(workerid);
            }



        })
    })
}
//=======================
// editWorker function
//=======================

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
    formltitle.textContent = "Edit worker";
    formltitle.style.color = "orange";
    btnedit.addEventListener('click', (e) => {

        if (btnedit.textContent == "Edit") {
            let worker = validationworker(e);
            worker.id = workersna[index].id;
            workersna[index] = worker;
            workers[index] = worker;

            btnedit.textContent = "Save worker";
            formltitle.textContent = "Add worker";
            formltitle.style = "none";
            modal.style.display = 'none';
            btnedit.style = "none";
            saveData();
            showworker(workersna);
            handprofileActionClick();
        }

    })

}
// =======================
//detailsWorker function
// =======================

function detailWorker(wid) {
    workers.forEach(work => {
        if (work.id == wid) {
            index = workers.indexOf(work);

        }
    })
    const modalwoker = document.querySelector('#modal-woker');

    modaltitle.textContent = "Profile";
    document.getElementById('assingmodal').style.display = 'flex';
    modalwoker.innerHTML = '';
    modalwoker.innerHTML = `
     <div class="flex flex-col gap-3">
                    <div class=" p-3"><img src="${workers[index].image}" alt="" width="200" height="200"
                            class="rounded-full border">
                    </div>
                    <div class=" rounded-md p-2 flex flex-col gap-1 bg-gray-200">
                     <h3 class="Experience rounded-sm bg-gray-400">Information personnel</h3>
                        <p ><span class="fontsans">Name:</span>${workers[index].name}</p>
                        <p ><span class="fontsans">Role:</span>${workers[index].role}</p>
                        <p ><span class="fontsans">Email:</span>${workers[index].email}</p>
                        <p ><span class="fontsans">Telephone:</span>${workers[index].telephone}</p>

                    </div>
                   
                </div>
    `

    if (workers[index].expirience) {

        let c = 1;
        workers[index].expirience.forEach(expirien => {


            modalwoker.children[0].innerHTML += `
          <div class=" rounded-md p-2 flex flex-col gap-1 bg-gray-200">
                        <h3 class="Experience rounded-sm bg-gray-400">Experience:${c++}</h3>
                        <p><span class="fontsans">Company:</span>${expirien.company}</p>
                        <p><span class="fontsans">Role:</span>${expirien.role}</p>
                        <p ><span class="fontsans">From:</span>${expirien.datefrom}</p>
                        <p ><span class="fontsans">To:</span>${expirien.dateTo}</p>
                    </div>
        `
        })
    }

}
// ======================
//delettsWorker function
// ======================
function delettsWorker(wid, assingine) {
    workers.forEach(work => {
        if (work.id == wid) {
            index = workers.indexOf(work);

        }
    });

    const workinroom = workers.filter(wrk => wrk.room == workers[index].room && wrk.id != workers[index].id);
    console.log(workinroom);

    const room = workers[index].room;
    workers[index].room = null;

    show_assig_inroom_2(workinroom, assingine)
    workersna.push(workers[index]);

    showworker(workersna);
    if(!assingine.children[0]){
        if(assingine.parentElement.dataset.room !="conference" && assingine.parentElement.dataset.room !="staff")
        assingine.parentElement.classList.add("roombg");
    }
    saveData();
    handprofileActionClick();
}
// ============================
//show_assig_inroom_2 function 
// ============================
function show_assig_inroom_2(workeras, assingin) {

    if (workeras.length != 0) {
        assingin.innerHTML = '';
        workeras.forEach(work => {
            assingin.innerHTML += `
            <div class="profil worker flex  p-2 border rounded-md gap-3 bg-neutral-50 text-base shadow-md
             border-gray-200 w-[40%]" data-btn="details" data-id="${work.id}">
                <img src="${work.image}" alt="" class="profil-image rounded-3xl" width="30" height="30">
                <div class="flex flex-col justify-center">
                     <p class="name text-xs">${work.name}</p>
                    <p class="role text-xs">${work.role}</p>
                </div>
                <button class="btnx m-auto border pl-0.5 pr-0.5 rounded-2xl flex justify-center items-center w-2
                 text-white dellet"><span  data-btn="dellet" data-id="${work.id}">x</span></button>
            </div> 

      `
        })

        handprofileActionClick();
    }
}
// ======================
//searchEworker function
// ======================
function searchEworker() {
    const inputrecherch = document.querySelector('.inputrecherch');
    inputrecherch.addEventListener('input', () => {
        let workerfilter;
        workerfilter = workersna.filter(work => work.name.toLowerCase().includes((inputrecherch.value).toLowerCase()));
        showworker(workerfilter);
        handprofileActionClick();

    })
}
searchEworker();

const listworker=document.querySelector('.listworker');
listworker.addEventListener('click',()=>{
    document.querySelector('#aside-staff-membres').classList.toggle("toogle");
})
// ======================
//Init_showWorker_inroom function
// ======================
function  Init_showWorker_inroom(){
    const introom=document.querySelectorAll('.room');
    introom.forEach((zoon)=>{
        const zoonchild=zoon.children[1];
        
        const zoochildworker=workers.filter(work=>zoonchild.dataset.zoon==work.room )
        console.log(zoochildworker);
        
        show_assig_inroom_2(zoochildworker,zoonchild);
   
    })
}