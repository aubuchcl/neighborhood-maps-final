// constructor
function Location(title, location, count){
    var self = this;
    self.count = count;
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

    var i = 0
    locations.forEach(function(location){
        console.log(i)
        self.locations.push(new Location(location.title, location.location, i));
        i += 1

    });

    // http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
    self.filteredList = ko.computed(function(){
        var filter = self.searchResults().toUpperCase();
        console.log("****")
        console.log(filter)
        if(filter === ""){
            self.locations().forEach(function(location){
                console.log('made it')
                location.visibility(true)
            });
            return self.locations();
        } else {
            return ko.utils.arrayFilter(self.locations(), function(location){
                var string = location.title.toUpperCase();
                var result = (string.search(filter) >= 0);
                location.visibility(result)
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






// for(var i = 0; i < markers.length; i++){
                //     console.log('made it')
                //     console.log(markers[i].title)
                //     console.log(result)
                //     console.log(location.title)
                //     if(markers[i].title == location.title && result == false){
                //         markers[i].setVisible(false);
                //     } else {
                //         markers[i].setVisible(true);
                //     }
                // };