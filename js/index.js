"use strict";

let http = new XMLHttpRequest();

http.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
        let response = JSON.parse(http.responseText);

        let data = response.data;
        
        let output = '';

        for(let item of data){

            const getDate = item.dateVenue;
            const date = new Date(getDate); 
            const day = date.getDate();
            const options = { month: "long" };
            const month = new Intl.DateTimeFormat("en-US", options).format(date);
            const year = date.getFullYear();

            const getTime = item.timeVenueUTC;

            if(getTime == '00:00:00'){
                item.timeVenueUTC = item.status;
            }
            else if(getTime != '00:00:00'){
                let time = parseInt(getTime);
                let timeFourDigits = time.toFixed(2);
                item.timeVenueUTC = timeFourDigits;
            }
           
                
            const homeTeamName = item.homeTeam ? item.homeTeam.officialName : 'Undetermined';

            output += 
                    `<div class="event">
                        <div class="event-left">
                            <div class="event-date">
                                <div class="date">${day} ${month} </div>
                                <div class="year">${year}</div>
                            </div>
                        </div>

                        <div class="event-right">
                            <h3 class="event-title">${item.originCompetitionName}</h3>
                            
                            <div class="event-description">
                                ${homeTeamName}
                                <span class="versus">vs.</span>
                                ${item.awayTeam.officialName}
                            </div>
                                
                            <div class="event-timing">
                                <img src="../img/uhr.png" alt="time"> ${item.timeVenueUTC}
                            </div>

                            <div class="event-btn">
                                <a href="../html/detailsPage.html?event=${item.id}">details</a>        
                            </div>  
                        </div>
                    </div>`;
        }
    
        document.getElementById('event-container').innerHTML = output;
    }
};

http.open("GET","../json/sportData.json", true);
http.send();

