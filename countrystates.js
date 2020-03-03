const url = 'https://xc-ajax-demo.herokuapp.com/api/countries/';
const inputField = document.querySelector('#dropdown');
let countries;
const getCountries = async () => {
    
    try {
        const response = await fetch(url, {cache: 'no-cache'});
        if (response.ok){
            const jsonResponse = await response.json();
            var select = document.getElementById("countries");
            // var firstelement = document.createElement("option");
            // firstelement.text="Select a country"
            // firstelement.setAttribute("disabled", "disabled")
            // firstelement.setAttribute("selected", "selected")
            // firstelement.setAttribute("hidden", "hidden")
            // select.add(firstelement);
            for (var i = 0; i < jsonResponse.length; i++){

                var option = document.createElement('option');
                option.text = option.value = jsonResponse[i]['name'];
                select.add(option, 0);
            }
            countries = jsonResponse;
        }
    }
    catch(error){
        console.log(error);

    }
}

function resetstates(){
    var select = document.getElementById("states");
    var numbernodes = select.childNodes.length
    for(var i=0; i<numbernodes; i++){
        select.removeChild(select.childNodes[select.childNodes.length-1])
    }
    // var child = select.lastElementChild;  
    // while (child) { 
    //     select.removeChild(child); 
    //     child = select.lastElementChild; 
    // } 
}

const displayStates = async () => {
    resetstates();
    var selectedCountry = document.getElementById("countries").value;
    let countryCode;
    countries.forEach(item => {
        if (item['name'] === selectedCountry){
            countryCode = item['code'];

        }
    });
    console.log("country code is: " + countryCode);
    const endpoint = `${url}${countryCode}/states/`;
    console.log(endpoint);
    try {
        const response = await fetch(endpoint, {code: countryCode});
        if (response.ok){
            const jsonResponse = await response.json();
            for (var i = 0; i < jsonResponse.length; i++){
                var select = document.getElementById("states");
                var option = document.createElement('option');
                option.text = option.value = jsonResponse[i]['name'];
                select.add(option, 0);
                }
            
            }

        } 
    catch(error){
        console.log(error);
    }


}

