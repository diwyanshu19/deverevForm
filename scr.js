const inputText = Array.from(document.querySelectorAll("input[type=text]"));
const password = document.querySelector(".pass");
const confirmPassword = document.querySelector(".confirm");
const email = document.querySelector("input[type=email");
const numb = document.querySelector("input[type=number]");
const errordiv  = document.querySelector(".error");

const form = document.querySelector('.formele');
let globaltrue = true;
let data = [];
inputText.map((x,index,_)=>{
  x.addEventListener('change',(e)=>{
   let ele  = e.target;
  globaltrue =  checkUsername(ele,index+1);
  });
})
numb.addEventListener('change',(e)=>{
   
   globaltrue = globaltrue & checkNumb(e.target);
})
email.addEventListener('change',(e)=>{
   let ele  = e.target;
   globaltrue = globaltrue & checkEmail(ele);
})
password.addEventListener('change',(e)=>{

   const pass = e.target;
   globaltrue = globaltrue &  checkPassword(pass);

})
confirmPassword.addEventListener('change',(e)=>{
   const passconfirm = e.target;
   globaltrue = globaltrue &  checkConfirmPassword(passconfirm);

})
const checkUsername = (ele,idx) => {

   let valid = false;

   const min = 3,
       max = 20;

   const username = ele.value.trim();
   if(namevalid(username)){
      //  alert("Username must not contain number characters");
       displayMessage("Username must not contain number characters",ele,idx);
       ele.focus();
      }
   else if (!isRequired(username)) {
      //  alert('Username cannot be blank.');
       displayMessage("Username cannot be blank.",ele,idx);
       ele.focus();
   } else if (!isBetween(username.length, min, max)) {
      // alert(`Username must be between ${min} and ${max} characters.`);
      displayMessage(`Username must be between ${min} and ${max} characters.`,ele,idx);
      ele.focus();
   } else {
     
       valid = true;
       displayMessage('',ele,idx);
   }
   return valid;
};
const checkNumb = (ele)=>{
   let valid = false;
   const min = 10;
    let idx = 6;
     const   max = 10;
       const number = ele.value.trim();
       console.log(number);
       if (!isRequired(number)) {
         displayMessage("phoneNumber cannot be blank.",ele,idx);
         ele.focus();
         return ;
     }
      else if (!isBetween(number.length, min, max)) {
       
        displayMessage(`number must ${max} characters.`,ele,idx);
        ele.focus();
     } else {
      displayMessage('',ele,idx);
         valid = true;
     }
     return valid;
}
const checkEmail = (ele) => {
   let valid = false;
   let idx = 5;
   const emailUser = ele.value.trim();
   if (!isRequired(emailUser)) {  
      displayMessage("Email cannot be blank.",ele,idx);
      ele.focus();
   } else if (!isEmailValid(emailUser)) {
      displayMessage("Email is not valid.",ele,idx);
      ele.focus();
   } else {
       valid = true;
       displayMessage('',ele,idx);

   }
   return valid;
};

const checkPassword = (pass) => {
   let valid = false;
  let idx = 3;

   const password = pass.value.trim();

   if (!isRequired(password)) {
   displayMessage("Password cannot be blank.",pass,idx);
   pass.focus();
   } else if (!isPasswordSecure(password)) {
      displayMessage("Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)",pass,idx);
      pass.focus();
   } else {
      displayMessage('',pass,idx);
       valid = true;
   }

   return valid;
};

const checkConfirmPassword = (pass) => {
   let valid = false;
   // check confirm password
   let idx = 4;
   const confirmPassword = pass.value.trim();
   const passw = password.value.trim();
  console.log(confirmPassword,passw);
   if (!isRequired(confirmPassword)) {
      
       displayMessage("Please enter the password again",pass,idx);
       pass.focus();

   } else if (passw !== confirmPassword) {
     
      displayMessage("The password does not match",pass,idx);
      pass.focus();
   } else {
      displayMessage('',pass,idx);
       valid = true;
   }

   return valid;
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (em) => {
   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(em);
};
const namevalid = (val)=>{
   const re =  new RegExp("^(?=.*[0-9])");
   const se = new RegExp("(?=.*[!@#\$%\^&\*])");
   // console.log(re.test(val));
   return re.test(val) || se.test(val);
}

const isPasswordSecure = (password) => {
   const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
   return re.test(password);
};
form.addEventListener('submit',(e)=>{

   e.preventDefault();
   console.log(globaltrue);
   if(!globaltrue){alert("incorrects fields");
    return ;}

  let fields= form.elements;
   data = [{firstName:fields[0].value},{lastName:fields[1].value},{password:fields[2].value},{email:fields[6].value},{number:fields[7].value},{domain:fields[8].value}];
   console.log(data);
})
// 0deb0ca1
function displayMessage(mssg,ele,id){
   if(mssg === ''){
      console.log("inside");
      ele.style.borderBottom = "";
      
      let arr = Array.from(errordiv.children).filter((x)=> x.id!= id);
      errordiv.innerHTML = '';
      console.log(arr);
      arr.forEach((x)=> errordiv.append(x));
      ele.style.borderBottom = '2.5px solid #5fff5bb5';
      return ;
   }
  ele.style.borderBottom = '2.5px solid rgba(235, 62, 62, 0.837)';
  
  errordiv.insertAdjacentHTML('afterbegin',` <div class="errorbox" id = ${id}>
  <span>☠️</span> <span id="errorMessage">${mssg}</span>
</div>`)
  
}
// ascci value
// 0->48
// 9->67
// a->97œ
// z->122
// A->65
// Z->90
// !->33
// @->64