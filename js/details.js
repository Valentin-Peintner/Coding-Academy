"use strict";


function extract(data,id){
 
    for(let item of data){
        if(item.id == id){
            return item;
        }
    }
    return null; 
}

let http = new XMLHttpRequest();

http.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
        let response = JSON.parse(http.responseText);

        let data = response.data;
        const id = new URLSearchParams(window.location.search).get('event') 

   
        const event = extract(data,id);
        
        if(event == null){
            alert("Event not found!");
        }    
     
        let output = '';

        const getDate = event.dateVenue;
        const date = new Date(getDate); 
        const day = date.getDate();
        const options = { month: "long" };
        const month = new Intl.DateTimeFormat("en-US", options).format(date);
        const year = date.getFullYear();

        // Function 
        let yellowCard = event.result.yellowCards;

            if (yellowCard.length === 0) {
                yellowCard = 0;
            }
            else{
                yellowCard = yellowCard.length;
            }

        let secondYellowCards = event.result.secondYellowCards;

            if (secondYellowCards.length == 0) {
                secondYellowCards = 0;
            }
            else{
                secondYellowCards = secondYellowCards.length;
            }

        let directRedCards = event.result.directRedCards;

            if (directRedCards.length == 0) {
                directRedCards = 0;
            }
            else{
                directRedCards = directRedCards.length;
            }
        
        
        let homeTeamName = event.homeTeam ? event.homeTeam.name : 'Undetermined';
        
        
        output += 
                `<div class="detail">
                    <div class="detail-up">
                        <div class="detail-date">
                            <div class="date">${day} ${month} </div>
                            <div class="year">${year}</div>
                        </div>
                    </div>

                    <div class="detail-down">
                        <h3 class="detail-title">${event.originCompetitionName}</h3>
                        <p class="stage">${event.stage.name}</p>
                    
                        <div class="detail-description">
                            <div class="detail-homeTeam">
                                <h3 class="teamName">${homeTeamName}</h3>   
                                    <p class="goals">${event.result.homeGoals}</p>
                            </div> 

                            <div class="detail-awayTeam">
                                <h3 class="teamName">${event.awayTeam.name}</h3>                 
                                <p class="goals">${event.result.awayGoals}</p>
                            </div>
                        </div>
                            
                        <div class="detail-cards">
                            <div class="yellow">
                                Yellow Cards: ${yellowCard}
                            </div>

                            <div class="yellow-s">
                                Second Yellow Cards: ${secondYellowCards} 
                            </div>
            
                            <div class="red">
                                Red Cards: ${directRedCards} 
                            </div> 
                        </div>               
                    </div>
                </div>`;

        document.getElementById('details-container').innerHTML = output;
    }
};

http.open("GET","../json/sportData.json", true);
http.send();

