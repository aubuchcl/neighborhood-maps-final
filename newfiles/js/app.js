// model
var locations = [
	  {title: 'Northstar', location: {lat: 39.27324, lng: -120.1624164}},
	  {title: 'Squaw Valley', location: {lat: 39.2115732, lng: -120.1985282}},
	  {title: 'Sugar Bowl', location: {lat: 39.3043494, lng: -120.3357567}},
	  {title: 'Tahoe Donner Ski Area', location: {lat: 39.3524057, lng: -120.271583}},
	  {title: 'Alpine Meadows', location: {lat: 39.1574066, lng: -120.2390835}}
	];

//Marker constructor

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

						console.log(self.locations()[i].title.toUpperCase())
						console.log("***********")
						console.log(self.searchResults())
						li[i].style.display = "";
					};
				} else {
					li[i].style.display = "none";
				}
			}
	}

	$('#testButton').click(function(){
		self.filterList();
	})


}


// Activate knockout.js
ko.applyBindings(new AppViewModel());