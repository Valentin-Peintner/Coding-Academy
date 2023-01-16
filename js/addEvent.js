"use strict";

const submit = document.getElementById("submitBtn");

function showDiv() {
   document.getElementById("event-container").style.display = "block";
}

submit.addEventListener('click', showDiv);


const form = document.getElementById("formId");

function submitForm(e){
   e.preventDefault();

   const competition = document.getElementById("comp").value;
   const homeTeam = document.getElementById("hTeam").value;
   const awayTeam = document.getElementById("aTeam").value;
   const getDate = document.getElementById("match-date").value;
   const time = document.getElementById("match-time").value;
   const date = new Date(getDate); 
   const day = date.getDate();
   const options = { month: "long" };
   const month = new Intl.DateTimeFormat("en-US", options).format(date);

   const year = date.getFullYear();


let output = '';

output += `
         <div class="event">
               <div class="event-left">
                  <div class="event-date">
                  <div class="date">${day} ${month}  </div>
                  <div class="year">${year}</div>
                  </div>
               </div>

               <div class="event-right">
                  <h3 class="event-title">${competition}</h3>
                  

                  <div class="event-description">
                  ${homeTeam}<span class="versus"> vs. </span> ${awayTeam}  
                  </div>
                     
                  <div class="event-timing">
                     <img src="../img/uhr.png" alt="time"> ${time}
                  </div>              
               </div>
         </div>`;
         
    
   document.getElementById('event-container').innerHTML = output;

}

form.addEventListener('submit', submitForm);

