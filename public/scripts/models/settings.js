var app = app || {};

(function (module) {
  const userSettings = {
        wantDelivery: false,
        distance: 10000,
        price: '1, 2, 3, 4',
        wantOpen: false,
        location: [45.523, 122.676],
        slideshowInterval: 10000,
        maxNumBiz: 5,
        searchOffset: 0,
        gridNumColumns: 3,

        fetchSettings: function() {
           if (localStorage.settings) {
               let localStorageSettings = JSON.parse(localStorage.getItem('settings'));

                this.wantDelivery = localStorageSettings.wantDelivery;
                this.distance = localStorageSettings.distance;
                this.price = localStorageSettings.price;
                this.wantOpen = localStorageSettings.wantOpen;
                this.location = localStorageSettings.location; 
                this.slideshowInterval = localStorageSettings.slideshowInterval;
                this.maxNumBiz = localStorageSettings.maxNumBiz;
                this.searchOffset = localStorageSettings.searchOffset;
                this.gridNumColumns = localStorageSettings.gridNumColumns;
            }
            else {
                userSettings.pushSettings();
            }   
        },
        
        pushSettings: function() {
            var defaults = {
                wantDelivery: userSettings.wantDelivery,
                distance: userSettings.distance,
                price: userSettings.price,
                wantOpen: userSettings.wantOpen,
                location: userSettings.location,
                slideshowInterval: userSettings.slideshowInterval,
                maxNumBiz: userSettings.maxNumBiz,
                searchOffset: userSettings.searchOffset,
                gridNumColumns: userSettings.gridNumColumns
            }
            localStorage.setItem('settings', JSON.stringify(defaults))          

        },

        getGeoLoc: function(callback) {
            console.log("searching LOCATION")
            $.ajax({
                 url: '/geolocation/getGeoLoc',
                 type: 'POST',
                 contentType: 'application/json'
            })
            .then(resp => {    
                userSettings.location = resp.location;
                callback();
            },

            err => console.error(err));
             
             
        }
    }

    module.userSettings = userSettings;



})(app); 

// app