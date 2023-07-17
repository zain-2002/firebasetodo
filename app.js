// Hello Everyone.
// This Is A Simple App Login Sing Up From Validation.
// I Hope You Like It And i tried To Make The JavaScript Code simple 
// See You Guys In Next Project :)
// Thanks.

// - - - - -  Variables - - - - - //

// Wrapper Area
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCjCu1l3vUidvnqeEX4N32_y0mRR01rG5A",
    authDomain: "zainfirstproject.firebaseapp.com",
    databaseURL: "https://zainfirstproject-default-rtdb.firebaseio.com",
    projectId: "zainfirstproject",
    storageBucket: "zainfirstproject.appspot.com",
    messagingSenderId: "161134109513",
    appId: "1:161134109513:web:f5f12ee7d7ea2b9ddb7098",
    measurementId: "G-EH5V99VJ8K"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
import { 
    getAuth, createUserWithEmailAndPassword, onAuthStateChanged,signOut,signInWithEmailAndPassword
 } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
 import { 
  getDatabase,
  ref,
  push,
  onValue,
  child,
  set,
  query,
  equalTo,
  get,
  orderByChild,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
const db=getDatabase(app);
const wrapper__Area = document.querySelector('#wrapper_Area');

// Login & Sing-Up Forms
const loginForm = document.querySelector('#loginForm');
const signUpForm = document.querySelector('#signUpForm');


// All Login And Sing-Up Forms Inputs 
const allLoginFormFields = Array.from(document.querySelectorAll('#loginForm .input__group .field input'));
const allSignUpFormFields = Array.from(document.querySelectorAll('#signUpForm .input__group:not(.confirm__group) .field input'));

// Password And Confirm Password Fileds
const passwordField = document.querySelector('#signUpPassword');
const confirmPassword = document.querySelector('#signUpConfirmPassword');

// Login % Sign-Up Submit Buttons
const loginFormSubmitBtn = document.querySelector('#loginSubmitBtn');
const signUpFormSubmitBtn = document.querySelector('#signUpSubmitBtn');
loginFormSubmitBtn.addEventListener('click',login)
function login(){
const uemail=document.getElementById('loginemail').value
const pass=document.getElementById('loginPassword').value
  signInWithEmailAndPassword(auth, uemail, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
const logoutbtn=document.getElementById('logoutbtn')
logoutbtn.addEventListener('click',logout)
function logout(){
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}
signUpFormSubmitBtn.addEventListener('click',register)
const auth = getAuth(app);
function register(){
const signUpUsername=document.getElementById('signUpUsername').value
const uemail=document.getElementById('signUpEmail').value
const pass=document.getElementById('signUpPassword').value


createUserWithEmailAndPassword(auth, uemail, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    const adref=ref(db,`users/${user.uid}/`)
    const ob={
      signUpUsername,
      uemail,
      pass
    }
    set(adref,ob)

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
}
const logindiv=document.getElementById('formcont')
const cont=document.getElementById('contentcont')
const greeting=document.getElementById('greeting')
const loader=document.getElementById('loader')
onAuthStateChanged(auth, user => {
    if (user) {
      const uid = user.uid
      loader.style.display = 'none'
      logindiv.style.display='none'
    cont.style.display='block'
document.body.style.display='block'
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${user.uid}/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const dbdata=snapshot.val()
    greeting.innerText='HELLO '+dbdata.signUpUsername.toString().toUpperCase()+'!'
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

      // ...
    } else {
      // User is signed out
      loader.style.display = 'none'
      logindiv.style.display='block'
      cont.style.display='none'
      document.body.style.display='flex'
      // ...
    }
  })
  function buttonColors(btn){
    Array.from(document.getElementsByClassName('chipbtn')).forEach((bt)=>{
      bt.parentElement.style.backgroundColor='transparent';
      bt.style.color='black'
    })
    btn.parentElement.style.backgroundColor='rgb(60, 120, 233)';
btn.style.color='white'


  }

const todocont=document.getElementById('todocont')
const addtodo=document.getElementById('addtodo')
addtodo.addEventListener('click',loadAddtodo)
function loadAddtodo() {
  buttonColors(this);
  todocont.style.display='flex'
  filtereddiv.style.display='none'
}
 const filtereddiv=document.getElementById('filtereddiv')
 const viewtodo=document.getElementById('viewtodo')

 viewtodo.addEventListener('click',() =>{ viewtodosfromdb()})
 function viewtodosfromdb(){

  Array.from(document.getElementsByClassName('chipbtn')).forEach((bt)=>{
    bt.parentElement.style.backgroundColor='transparent';
    bt.style.color='black'
  })
  
  document.getElementById('viewtodo').parentElement.style.backgroundColor='rgb(60, 120, 233)';
  document.getElementById('viewtodo').style.color='white'

 
 todocont.style.display='none';
 filtereddiv.style.display='flex';
 
 const todoListRef = ref(db, `todos/${auth.currentUser.uid}`)
  onValue(todoListRef, snapshot => {
    const isDataExist = snapshot.exists()
    if (isDataExist) {
      filtereddiv.innerHTML = null
      snapshot.forEach(childSnapshot => {
       const childKey = childSnapshot.key
        const childData = childSnapshot.val()
      
   
        const dbdataOftodos=`
        <div class="dbdataOftodos">
        <label>TASK : <input type='text' id='taskdone_${childKey}' value='${Object.values(childData)[3]}'></label>
        <label>TASK DATE/TIME : <input type='datetime-local' id='tasktime_${childKey}' value='${Object.values(childData)[2]}'></label>
        <label>STATUS :  <input type="checkbox" id='statuscheck_${childKey}'></label>
        <button class="dbdatatodosbtn edit"  >EDIT</button>
        <button class="dbdatatodosbtn delete" id="${childKey}">DELETE</button>
        <button class="dbdatatodosbtn save" id="save_${childKey}">SAVE</button>
        </div>
        `
       
        filtereddiv.innerHTML+=dbdataOftodos;
setTimeout(()=>{
  if (Object.values(childData)[1]==='completed') {
    document.getElementById(`statuscheck_${childKey}`).checked=true
   }
},200)
      
      
       document.getElementById(`taskdone_${childKey}`).readOnly=true
       document.getElementById(`tasktime_${childKey}`).readOnly=true
       document.getElementById(`statuscheck_${childKey}`).disabled=true
       document.getElementById(`save_${childKey}`).style.display='none'
      })}})

let taskdata=null;
let datetimedata=null
let checkboxdata=null;
setTimeout(()=>{
  Array.from(document.getElementsByClassName('edit')).forEach(btn=>{
    btn.addEventListener('click',()=>{
      btn.style.opacity='.6'
      btn.disabled=true
      btn.nextElementSibling.nextElementSibling.style.display='block';
      btn.previousElementSibling.firstElementChild.disabled=false;
      btn.previousElementSibling.previousElementSibling.firstElementChild.readOnly=false;
      btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.readOnly=false;
      datetimedata=btn.previousElementSibling.previousElementSibling.firstElementChild.value;
      taskdata=btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value;
      checkboxdata=(btn.previousElementSibling.firstElementChild.checked) ? true : false;
    
    })
  })
},200)

setTimeout(()=>{
  Array.from(document.getElementsByClassName('save')).forEach(btn=>{
    btn.addEventListener('click',()=>{
     
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "Data in database will get changed!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Change",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire("Saved!", "Your changes are applied", "success");
            btn.style.display='none'
            
            btn.previousElementSibling.previousElementSibling.disabled=false
            btn.previousElementSibling.previousElementSibling.style.opacity='1'
            btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.disabled=true;
            btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.readOnly=true;
            btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.readOnly=true;
            const btid=btn.id.slice(5)
            const todoRef = ref(db, `todos/${auth.currentUser.uid}/${btid}`);
            let status
            (btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.checked) ? status='completed':status='pending'
         let taskdatetime=btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value
let taskinput= btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value
update(todoRef, { status,taskdatetime,taskinput})
viewtodosfromdb();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire("Cancelled", "Your changes are rejeccted!", "error");
            btn.previousElementSibling.previousElementSibling.disabled=false
            btn.previousElementSibling.previousElementSibling.style.opacity='1'
            btn.style.display='none'
            btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.disabled=true;
            btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.readOnly=true;
            btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.readOnly=true;

            btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value=taskdata;

 btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value=datetimedata;

 btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.checked=checkboxdata;


        };
    });
      

    
    })
  })
},200)


setTimeout(()=>{
  Array.from(document.getElementsByClassName('delete')).forEach(btn=>{
    btn.addEventListener('click',()=>{

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "Data in database will get deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            swalWithBootstrapButtons.fire("Deleted!", "Your changes are applied", "success");
            const todoRef = ref(db, `todos/${auth.currentUser.uid}/${btn.id}`)
            remove(todoRef)
            setTimeout(()=>{
              viewtodosfromdb()
            },200)
           btn.parentElement.remove();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire("Cancelled", "Your changes are rejeccted!", "error");
        };  
    });
      




    
    })
  })
},200)




} 


const submittodobtn=document.getElementById('submittodobtn')
submittodobtn.addEventListener('click',addtodoTO_DB)
function addtodoTO_DB(){

  const taskinput=document.getElementById('taskinput').value
  const taskdatetime=document.getElementById('taskdatetime').value
  if (!taskinput || !taskdatetime) return alert('Please add some todo')
  const todoListRef = ref(db, `todos/${auth.currentUser.uid}`)
  const newTodoRef = push(todoListRef)
  const obj = {
    taskinput,
    taskdatetime,
    status: 'pending'
  }
  const newTodoKey = newTodoRef.key;

// Add the key to your obj
obj.key = newTodoKey;
  set(newTodoRef, obj)
  Swal.fire({
   
    icon: 'success',
    title: 'ADDED TO DATABASE',
    showConfirmButton: false,
    timer: 1000
  });
  setTimeout(()=>{
    document.getElementById('taskdatetime').value=""
    document.getElementById('taskinput').value=""
  },200)
 
}

const viewpendingtodo=document.getElementById('viewpendingtodo')
viewpendingtodo.addEventListener('click',pendingtodofunc)
function pendingtodofunc() {
 
  Array.from(document.getElementsByClassName('chipbtn')).forEach((bt)=>{
    bt.parentElement.style.backgroundColor='transparent';
    bt.style.color='black'
  })
  
  document.getElementById('viewpendingtodo').parentElement.style.backgroundColor='rgb(60, 120, 233)';
  document.getElementById('viewpendingtodo').style.color='white'




  filtereddiv.innerHTML=''
  const pendingtasks = query(ref(db, `todos/${auth.currentUser.uid}`), orderByChild('status'),equalTo('pending'));
  get(pendingtasks).then((snapshot)=>{
   
snapshot.forEach(childSnapshot =>{
const obj=childSnapshot.val()



  const dbdataOftodos=`
        <div class="dbdataOftodos">
        <label>TASK : <input type='text'  value='${obj.taskinput}' id="taskdone_${obj.key}"></label>
        <label>TASK DATE/TIME : <input type='datetime-local' value='${obj.taskdatetime}' id="tasktime_${obj.key}"></label>
        <label>STATUS :  <input type="checkbox" id='statuscheck_${obj.key}' ></label>
        <button class="dbdatatodosbtn edit"  >EDIT</button>
        <button class="dbdatatodosbtn delete" id="${obj.key}">DELETE</button>
        <button class="dbdatatodosbtn save" id="save_${obj.key}">SAVE</button>
        </div>
        `
        filtereddiv.innerHTML+=dbdataOftodos;
     
         document.getElementById(`taskdone_${obj.key}`).readOnly=true
         document.getElementById(`tasktime_${obj.key}`).readOnly=true
         document.getElementById(`statuscheck_${obj.key}`).disabled=true
         document.getElementById(`save_${obj.key}`).style.display='none'
       
         editb_Save_DeletebtnFunc(pendingtodofunc)
})
  });

}

function editb_Save_DeletebtnFunc(callback){


  
let taskdata=null;
let datetimedata=null
let checkboxdata=null;
  setTimeout(()=>{
    Array.from(document.getElementsByClassName('edit')).forEach(btn=>{
      btn.addEventListener('click',()=>{
        btn.style.opacity='.6'
        btn.disabled=true
        btn.nextElementSibling.nextElementSibling.style.display='block';
        btn.previousElementSibling.firstElementChild.disabled=false;
        btn.previousElementSibling.previousElementSibling.firstElementChild.readOnly=false;
        btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.readOnly=false;
        datetimedata=btn.previousElementSibling.previousElementSibling.firstElementChild.value;
        taskdata=btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value;
        checkboxdata=(btn.previousElementSibling.firstElementChild.checked) ? true : false;
      
      })
    })
  },200)


  setTimeout(()=>{
    Array.from(document.getElementsByClassName('save')).forEach(btn=>{
      btn.addEventListener('click',()=>{
       
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "Data in database will get changed!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Change",
          cancelButtonText: "Cancel",
          reverseButtons: true
      }).then((result) => {
          if (result.isConfirmed) {
              swalWithBootstrapButtons.fire("Saved!", "Your changes are applied", "success");
              btn.style.display='none'
              
              btn.previousElementSibling.previousElementSibling.disabled=false
              btn.previousElementSibling.previousElementSibling.style.opacity='1'
              btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.disabled=true;
              btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.readOnly=true;
              btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.readOnly=true;
              const btid=btn.id.slice(5)
              const todoRef = ref(db, `todos/${auth.currentUser.uid}/${btid}`);
              let status
              (btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.checked) ? status='completed':status='pending'
           let taskdatetime=btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value
  let taskinput= btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value
  update(todoRef, { status,taskdatetime,taskinput})
  callback();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire("Cancelled", "Your changes are rejeccted!", "error");
              btn.previousElementSibling.previousElementSibling.disabled=false
              btn.previousElementSibling.previousElementSibling.style.opacity='1'
              btn.style.display='none'
              btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.disabled=true;
              btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.readOnly=true;
              btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.readOnly=true;
  
              btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value=taskdata;
  
   btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.value=datetimedata;
  
   btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.checked=checkboxdata;
  
  
          };
      });
        
  
      
      })
    })
  },200)



  setTimeout(()=>{
    Array.from(document.getElementsByClassName('delete')).forEach(btn=>{
      btn.addEventListener('click',()=>{
  
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "Data in database will get deleted!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          reverseButtons: true
      }).then((result) => {
          if (result.isConfirmed) {
  
              swalWithBootstrapButtons.fire("Deleted!", "Your changes are applied", "success");
              const todoRef = ref(db, `todos/${auth.currentUser.uid}/${btn.id}`)
              remove(todoRef)
              setTimeout(()=>{
                callback()
              },200)
             btn.parentElement.remove();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire("Cancelled", "Your changes are rejeccted!", "error");
          };  
      });
        
  
  
  
  
      
      })
    })
  },200)
  


  
}



const viewcompletedtodo=document.getElementById('viewcompletedtodo')
viewcompletedtodo.addEventListener('click',completedtodofunc)
function completedtodofunc() {
  buttonColors(this);
  filtereddiv.innerHTML=''
  const completedtasks = query(ref(db, `todos/${auth.currentUser.uid}`), orderByChild('status'),equalTo('completed'));
  let count=0;
  get(completedtasks).then((snapshot)=>{
   
snapshot.forEach(childSnapshot =>{
const obj=childSnapshot.val()


  count++;
  const dbdataOftodos=`
        <div class="dbdataOftodos">
        <label>TASK : <input type='text'  value='${obj.taskinput}' id="taskdone_${count}"></label>
        <label>TASK DATE/TIME : <input type='datetime-local' value='${obj.taskdatetime}' id="tasktime_${count}"></label>
        <label>STATUS :  <input type="checkbox" id='statuscheck_${count}' checked></label>
        </div>
        `


        
        filtereddiv.innerHTML+=dbdataOftodos;
     
          document.getElementById(`taskdone_${count}`).readOnly=true
          document.getElementById(`tasktime_${count}`).readOnly=true
          document.getElementById(`statuscheck_${count}`).disabled=true
       
})
  });

}

const viewtodaystodo=document.getElementById('viewtodaystodo')
viewtodaystodo.addEventListener('click',todaytodo)
function todaytodo(){
  Array.from(document.getElementsByClassName('chipbtn')).forEach((bt)=>{
    bt.parentElement.style.backgroundColor='transparent';
    bt.style.color='black'
  })
  
  document.getElementById('viewtodaystodo').parentElement.style.backgroundColor='rgb(60, 120, 233)';
  document.getElementById('viewtodaystodo').style.color='white'
  filtereddiv.innerHTML=''
  const currentDate = luxon.DateTime.now().toFormat("yyyy-MM-dd");
  
 const completedtasks = query(ref(db, `todos/${auth.currentUser.uid}`), orderByChild('taskdatetime'));
 let arr=[]
  get(completedtasks).then((snapshot)=>{
   
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const task = childSnapshot.val();
        if (task.taskdatetime && task.taskdatetime.split('T')[0] === currentDate) {
         
        
          const dbdataOftodos=`
                <div class="dbdataOftodos">
                <label>TASK : <input type='text'  value='${task.taskinput}' id="taskdone_${task.key}"></label>
                <label>TASK DATE/TIME : <input type='datetime-local' value='${task.taskdatetime}' id="tasktime_${task.key}"></label>
                <label>STATUS :  <input type="checkbox" id='statuscheck_${task.key}'  ></label>
                <button class="dbdatatodosbtn edit"  >EDIT</button>
                <button class="dbdatatodosbtn delete" id="${task.key}">DELETE</button>
                <button class="dbdatatodosbtn save" id="save_${task.key}">SAVE</button>
                </div>
                `
                filtereddiv.innerHTML+=dbdataOftodos;
            
                const statusValue = task.status === 'completed' ? true : false;
                console.log(statusValue);
                const statusCheckbox = document.getElementById(`statuscheck_${task.key}`);
                statusCheckbox.setAttribute('checked', statusValue);

         document.getElementById(`taskdone_${task.key}`).readOnly=true
         document.getElementById(`tasktime_${task.key}`).readOnly=true
         document.getElementById(`statuscheck_${task.key}`).disabled=true
         document.getElementById(`save_${task.key}`).style.display='none'
       
         editb_Save_DeletebtnFunc(todaytodo)
        }
      });
    } else {
   
      console.log("No tasks found for the current date.");
    }
  })
}
// Show Hide Password Element
const showHidePassDom = Array.from(document.querySelectorAll('.showHide__Icon i'));

// Pattrens Regex
const patterns = { // All This Regex Code Is For Demo You Can Add Your Own Regex Code :)
  username: /^[a-z]+\d?/,
  email: /^[^\W\d\.-_]+\w\d?@[a-z0-9]+\.([a-z0-9]{2,6})(\.[a-z0-9]{2,6})?$/,
  password: /^[^\d\W]\w+\d?\W?\w?/i,
};

// Aside Area
const aside__Area = document.querySelector('#aside_Area');

// Aside Sing-Up & Sign In Buttons
const aside__SignUp_Button = document.querySelector('#aside_signUp_Btn');
const aside__SignIn_Button = document.querySelector('#aside_signIn_Btn');

// - - - - -  Events - - - - - //

// When Submitting On Login & Sign-Up Forms
loginForm.addEventListener('submit', (e) => {
  // Stop Form Submission
  e.preventDefault();
  // Call Login Form Validation Function
  loginFormValidation();
});
signUpForm.addEventListener('submit', (e) => {
  // Stop Form Submission
  e.preventDefault();
  // Call Sign-Up Form Validation Function
  signUpFormValidation();
});

// Every Time Click On Aside Sign-Up & Sing-In Buttons. Call Function Chnage Form Mode
aside__Area.addEventListener('click', chnageFormMode);
aside__Area.addEventListener('click', chnageFormMode);

// - - - - -  Functions - - - - - //

// Change Form Mode Function
function chnageFormMode(e) {
  // Check. If The Target Element Is Aside Sign-Up Button
  if(e.target === aside__SignUp_Button){
    // Add Class [ Sign Up Mode Active ] On Wrapper Area
    wrapper__Area.classList.add('sign-up__Mode-active');
  };
  // Check. If The Target Element Is Aside Sign-In Button
  if(e.target === aside__SignIn_Button){
    // Remove Class [ Sign Up Mode Active ] From Wrapper Area
    wrapper__Area.classList.remove('sign-up__Mode-active');
  };
};

// Function Show Hide Password
(function showHidePass() {
  // Loop On All The Show Hide Password Icon
  showHidePassDom.forEach(icon =>{
    // When Click On Any Show Hide Icon...
    icon.addEventListener('click', () => {
      // Select The Target Password Input
      const targetAreaInput = icon.parentElement.parentElement.querySelector('.field input');
      // If The Target Icon Has Hide-icon
      if(icon.className === 'bx bx-hide'){
        // Change The Target Icon Class
        icon.className = 'bx bx-show';
        // Change The Target Input Area Type
        targetAreaInput.setAttribute('type', 'text');
      }else{ // else
        // Change The Target Icon Class
        icon.className = 'bx bx-hide';
        // Change The Target Input Area Type
        targetAreaInput.setAttribute('type', 'password');
      };
    });
  });
})();

// Login Form Validation Function
function loginFormValidation() {
  // Loop On All The Inputs
  allLoginFormFields.forEach(input => {
    // Input Targte Field Name Value
    const inputAttribueValueName = input.attributes.name.value;
    // Input Value Without Spaces
    const inputValue = input.value.trim();
    // Input Regex Validation Response [ True || False ] :)
    const inputRegex = patterns[inputAttribueValueName].test(inputValue);

    // Check If The Input Value Is Empty
    if(inputValue === ''){
      // Call Function Set Error For
      setErrorFor(input, `${inputAttribueValueName} is required. Please enter your response.`);
    }else if(inputRegex === false){ // Else If: If The InputRegext Response Is False
      // Call Function Set Error For
      setErrorFor(input, `${inputAttribueValueName} Is Invalid .`);
    }else{ // Else
      // Call Function Set Success For
      setSuccessFor(input);
    };
  });
};

// Sign-Up Form Validation Function
function signUpFormValidation() {
  // Loop On All The Inputs
  allSignUpFormFields.forEach(input => {
    // Password And Confirm Password Fileds Values Without Spaces
    const passwordFieldValue = passwordField.value.trim();
    const conifrmPassValue = confirmPassword.value.trim();
    // Input Targte Field Name Value
    const inputAttribueValueName = input.attributes.name.value;
    // Input Value Without Spaces
    const inputValue = input.value.trim();
    // Input Regex Validation Response [ True || False ] :)
    const inputRegex = patterns[inputAttribueValueName].test(inputValue);

    // Check If The Input Value Is Empty
    if(inputValue === ''){
      // Call Function Set Error For
      setErrorFor(input, `${inputAttribueValueName} is required. Please enter your response.`);
    }else if(inputRegex === false){ // Else If: If The InputRegext Response Is False
      // Call Function Set Error For
      setErrorFor(input, `${inputAttribueValueName} Is Invalid .`);
    }else{ // Else
      // Call Function Set Success For
      setSuccessFor(input);
    };

    // Validation The Confirm Password
    if(conifrmPassValue === ''){ // Check If The Confirm Password Value Is Empty
      // Call Function Set Error For
      setErrorFor(confirmPassword, `Confirm password is required. Please enter your response.`);
    }else if(conifrmPassValue !== passwordFieldValue){ // Check If The Confirm Password Value Is Dose Not Match The Password Filed
      // Call Function Set Error For
      setErrorFor(confirmPassword, `Confirm password does not match`);
    }else{ // Eles
      // Call Function Set Success For
      setSuccessFor(confirmPassword);
    };

  });
};

// Set Error For Function
function setErrorFor(input, message){
  // Select The Target Parent Target Input Group
  const targetParentInput = input.parentElement.parentElement;
  // Select The Target Input Error Message
  const targetErrorMessage = targetParentInput.querySelector('.input__error_message');

  // Remove Class FormSucess From The Parent Target
  targetParentInput.classList.remove('formSuccess');
  // Add Class Success On Target ParentElement
  targetParentInput.classList.add('formError');
  // Set The Message Inside The Target Error Message
  targetErrorMessage.innerHTML = message;
};

// Set Success For Function
function setSuccessFor(input){
  // Select The Target Parent Target Input Group
  const targetParentInput = input.parentElement.parentElement;
  // Select The Target Input Error Message
  const targetErrorMessage = targetParentInput.querySelector('.input__error_message');

  // Remove Class FormError From The Parent Target
  targetParentInput.classList.remove('formError');
  // Add Class Success On Target ParentElement
  targetParentInput.classList.add('formSuccess');
  // Empty The Error Message
  targetErrorMessage.innerHTML = '';
};