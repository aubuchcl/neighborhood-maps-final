// constructor
function Location(title, location){
    var self = this;

    self.title = title;
    self.location = location;

}

// create the apps viewmodel

function AppViewModel(){
    var self = this;

    self.searchBar = ko.observable('');
    // title and location now come from the Location objects
    // self.title = ko.observable("NorthStar");
    // self.location = ko.observable("{lat: 100, long: 200}");

    self.searchResults = ko.computed(function(){
        var results = ""
        results += self.searchBar().toUpperCase();
        return results
    }, self)

    self.capitalizeInput = function(){
        var currentVal = self.searchBar();
        self.searchBar(currentVal.toUpperCase());

    };

    //locations initialized
    self.locations = ko.observableArray();

    locations.forEach(function(location){
        self.locations.push(new Location(location.title, location.location));
    });


    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    self.filterList = function(){
        console.log(self.locations().length)

            for(let i=0; i<self.locations().length; i++){
                if(self.locations()[i].title.toUpperCase().indexOf(self.searchResults()) > -1){
                    if(li[i] != undefined){
                        li[i].style.display = "";
                    };
                } else {
                    li[i].style.display = "none";
                }
            }
    }

}


// Activate knockout.js
var VM = new AppViewModel();
ko.applyBindings(VM);





