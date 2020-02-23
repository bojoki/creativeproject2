function printName(key, value) {
    switch(key) {
        case "gender":
            return value;
        case "name":
            return value.title + '. ' + value.first + ' ' + value.last;
        case "location":
            return value.street.number + ' ' + value.street.name + '<br />' + 
                value.city + ', ' + value.state + ' ' + value.country + ' ' + value.postcode;
        case "email":
            return value;
        case "login":
            return value.username + ' ' + value.password;
        case "dob":
            return moment(value.date).format('MMMM DD, YYYY');
        case "phone":
            return value;
        case "cell":
            return value;
    }

    
}
document.getElementById("buttonSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    let userData;
    const url = 'https://randomuser.me/api/';
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(json) {
        let user = json.results[0];
        let result = "";
        // set image
        let img = json.results[0].picture.large;
        result += '<img id="userImage" src="' + img + '"></img>';
        // set name
        result += '<h2> New User </h2>';
        let userKeys = Object.keys(user);
        for (let i = 0; i != userKeys.length; i++) {
            //printName(user[userKeys[i]])
            if (userKeys[i] != 'registered' && userKeys[i] != 'id' &&
                userKeys[i] != 'picture' && userKeys[i] != 'nat') { 
                result += '<p> <span id="key">' + userKeys[i].toLocaleUpperCase() + ": </span> <span id='value'>" + printName(userKeys[i], user[userKeys[i]]) + '</span> </p>';
            }
        }
        let fullName = json.results[0].name;
        // modify user div
        document.getElementById('userResult').innerHTML = result;

        document.getElementById('userResult').style.backgroundColor = "white";
        document.getElementById("userResult").style.boxShadow = "inset 2px 4px 6px gray";
        document.getElementById("userResult").style.borderBottom = "1px solid lightgray";
        
    }).catch(function(e) {
        console.log("error: ", e)
    });

});


