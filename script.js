const workers=[],workersna=[];

const counteur=1;

function addworker(){
 const modal=document.querySelector('.modal');
    modal.style.display='flex';

}
document.querySelector('#add-new-worker').addEventListener('click',addworker)
document.querySelector('#saveworker').addEventListener('click',(e)=>{

    const worker=validationworker(e)
    if(worker){
    workers.push(worker);
    workersna.push(worker);
    showworker(workersna);
 const modal=document.querySelector('.modal');
modal.style.display='none';
    }
})
document.querySelector('.modal__close').addEventListener('click',()=>{
    const modal=document.querySelector('.modal');
    modal.style.display='none';
})
//validationworker function
function validationworker(e) {
   e.preventDefault();
    const workername = document.querySelector('#worker-name');
    const  workerrole= document.querySelector('#worker-role');
    const workerimage= document.querySelector('#worker-image');
    const workeremail = document.querySelector('#worker-email');
    const workertele = document.querySelector('#worker-tel');
    const regexname = /^(?!\s*$)[A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.'-]{3,100}$/
    const regeximage = /^(?:https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?(?:\.(?:png|jpg|jpeg|gif|svg|webp))?\/?)?$/
    const regexsemail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const regexstele = /^(?:\+212|0)([5-7])\d{8}$/
    const regexdate =/^\d{4}-\d{2}-\d{2}$/
    
    


    if (!regexname.test(workername.value)) {
        const nameerrors=document.querySelector('#name-errors')
        nameerrors.innerHTML = "name invalide!";
        nameerrors.style.color='red';
        workername.style.border='1px solid red';
        return;

    }
     if (!regexname.test(workerrole.value)) {
       const roleerrors = document.querySelector('#role-errors')
        roleerrors.innerHTML = "role invalide!";
         roleerrors.style.color='red';
        workerrole.style.border='1px solid red';
        return;

    }
    if (!regeximage.test(workerimage.value)) {
        const imageerrors=document.querySelector('#image-errors');
        imageerrors.innerHTML = "URL-image invalide!";
         imageerrors.style.color='red';
        workerimage.style.border='1px solid red';
        return;

    }
   let expiriences = [];
    const Expireince = document.querySelectorAll('.Expireince');
    for (const Expir of Expireince) {

        if (Expir) {

            const Expireince__company = Expir.children[0].children[0].children[1];
            const Expireince__role =  Expir.children[0].children[1].children[1];
            const Expireince__Dfrom = Expir.children[0].children[2].children[1];
            const Expireince__DTo =  Expir.children[0].children[3].children[1];
            if (!regexname.test(Expireince__company.value)) {
              const componyerrors=Expireince__company.nextElementSibling;
                componyerrors.innerHTML = "company invalide! ";
                 componyerrors.style.color='red';
                Expireince__company.style.border='1px solid red';
                return;

            }
            if (!regexname.test(Expireince__role.value)) {
               const exproleerrors=Expireince__role.nextElementSibling;
                exproleerrors.innerHTML = "role invalide! ";
                 exproleerrors.style.color='red';
                Expireince__role.style.border='1px solid red';

                return;

            }
            if (!regexdate.test(Expireince__Dfrom.value)) {
                const Dfromerrors=Expireince__Dfrom.nextElementSibling;
                Dfromerrors.innerHTML = "datefrom invalide! ";
                 Dfromerrors.style.color='red';
                Expireince__Dfrom.style.border='1px solid red';
                return;

            }
             if (!regexdate.test(Expireince__DTo.value)) {
                const DToerrors=Expireince__DTo.nextElementSibling;
                DToerrors.innerHTML = "dateto invalide! ";
                 DToerrors.style.color='red';
                Expireince__DTo.style.border='1px solid red';
                return;

            }
            if(new Date(Expireince__DTo.value)<=new Date(Expireince__Dfrom.value)){
              const DToerrors=Expireince__DTo.nextElementSibling;
                DToerrors.innerHTML = "dateTo doit etre superieur a dateFrom! ";
                 DToerrors.style.color='red';
                Expireince__DTo.style.border='1px solid red';
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
        const emailerrors=document.querySelector('#email-errors')
        emailerrors.innerHTML = "email invalide! ";
        emailerrors.style.color='red';
        workeremail.style.border='1px solid red';
        return;

    }

    if (!regexstele.test(workertele.value)) {
        const teleerrors=document.querySelector('#tele-errors');
        teleerrors.innerHTML = "telephone invalide! ";
         teleerrors.style.color='red';
        workertele.style.border='1px solid red';
        return;

    }

    
    const worker = {
        id: counteur,
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
function removeErrurmessage(){
const input =document.querySelectorAll('.input');
input.forEach(inp => {
  inp.addEventListener('focus',(e)=>{
    e.target.style='none';
     e.target.nextElementSibling.innerHTML = "";

})})}
removeErrurmessage();
//add experience  function
function addexperience(){
    const cntinaireExpireince=document.querySelector('.cntinaireExpireince');
    cntinaireExpireince.innerHTML+=`
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

                            </div>
    `
    removeErrurmessage();
}
document.querySelector('.addExperience').addEventListener('click',addexperience)

//chowimage in form
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
function showworker(workerna){

    const staf=document.getElementById('staf');
     staf.innerHTML ='';
     
     workerna.forEach(work =>{
    staf.innerHTML+=`
     <div class="worker flex p-2 border rounded-md gap-3 bg-neutral-50 text-base shadow-md border-gray-200">
                            <img src="${work.image}" alt="" class="profil-image rounded-3xl" width="40" height="50">
                            <div class="flex flex-col justify-center">
                                <p class="name text-sm">${work.name}</p>
                                <p class="role text-xs">${work.role}</p>
                            </div>
                            <button class="m-auto text-amber-500">Edit</button>
                        </div> 
    `
     })
}



//addworkerroom function
 function addworkerroom(room){
     const modelworker=document.getElementById('modal-woker');
      const choix = room;
   
    switch (choix) {
        case "conference":
            modelworker.innerHTML='';
             workersna.forEach(work =>{
    modelworker.innerHTML+=`
     <div class="worker flex p-2 border rounded-md gap-3 bg-neutral-50 text-base shadow-md border-gray-200" data-id="${work.id}" data-room="${choix}" onclick='assingworker(this.dataset.room,this.dataset.id)'>
                            <img src="${work.image}" alt="" class="profil-image rounded-3xl" width="40" height="50">
                            <div class="flex flex-col justify-center">
                                <p class="name text-sm">${work.name}</p>
                                <p class="role text-xs">${work.role}</p>
                            </div>
                           
                        </div> 
    `
     })
            break;

    
}
document.getElementById('assingmodal').style.display='flex';

 }
 document.getElementById('closeassing').addEventListener('click',()=>{
    document.getElementById('assingmodal').style.display='none';
 })
 
//
function assingworker(choix,id){

const   workeras = workersna.filter(work => work.id=id);
const index= workersna.indexOf(workeras[0]);
console.log(index);


  switch (choix) {
    case "conference":
      const  conferenceroom=   document.getElementById('conference-room-worker');
      conferenceroom.innerHTML+=`
      <div class="worker flex  p-2 border rounded-md gap-3 bg-neutral-50 text-base shadow-md border-gray-200 w-[40%]">
                            <img src="" alt="${workeras[0].image}" class="profil-image rounded-3xl" width="30" height="30">
                            <div class="flex flex-col justify-center">
                                <p class="name text-xs">${workeras[0].name}</p>
                                <p class="role text-xs">${workeras[0].role}</p>
                            </div>
                            <button class="btnx m-auto border pl-0.5 pr-0.5 rounded-2xl  flex justify-center items-center text-white"><span>x</span></button>
                        </div>  
      `
    workersna.splice(index,1);
    showworker(workersna);
    break;
  }
}