// constructor
function Location(title, location){
    var self = this;

    self.title = title;
    self.location = location;
    self.visibility = ko.observable(true);

}

// create the apps viewmodel

function AppViewModel(){
    var self = this;

    // self.visible = ko.observable(true);

    self.searchBar = ko.observable('');

    self.searchResults = ko.computed(function(){
        var results = "";
        results += self.searchBar().toUpperCase();
        return results;
    },(self));

    self.capitalizeInput = function(){
        var currentVal = self.searchBar();
        self.searchBar(currentVal.toUpperCase());

    };

    //locations initialized
    self.locations = ko.observableArray();

    locations.forEach(function(location){

        self.locations.push(new Location(location.title, location.location));

    });


    // ul = document.getElementById("myUL");
    // li = ul.getElementsByTagName('li');

    // self.filterList = function(){
    //     for(var i=0; i<self.locations().length; i++){
    //         if(self.locations()[i].title.toUpperCase().indexOf(self.searchResults()) > -1){
    //             if(li[i] != undefined){
    //                 // li[i].style.display = "";
    //                 location[i].visible(true)
    //             }
    //         } else {
    //             li[i].style.display = "none";
    //         }
    //     }
    // };

    // http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
    self.filteredList = ko.computed(function(){
        var filter = self.searchResults().toUpperCase();
        console.log("****")
        console.log(filter)
        if(filter === ""){
            self.locations().forEach(function(location){
                console.log('made it')
                location.visibility(true)

                // console.log(location)
            });
            return self.locations();
        } else {
            return ko.utils.arrayFilter(self.locations(), function(location){
                var string = location.title.toUpperCase();
                var result = (string.search(filter) >= 0);
                location.visibility(result)
                console.log(location)
                console.log(result)
                return result;
            });
        }
    });

    self.eventClickWindow = function() {
        console.log("made it")
        markers.forEach(function(marker){marker.setAnimation(null)})
        var largeInfowindow = new google.maps.InfoWindow();

        for(var i = 0; i < markers.length; i++){
            if(this.title == markers[i].title){
                populateInfoWindow(markers[i], largeInfowindow);
            }
        }

    };

};


// Activate knockout.js
var VM = new AppViewModel();
ko.applyBindings(VM);