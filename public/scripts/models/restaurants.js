var app = app || {};

(function (module) {
    Biz.all = [];
    function Biz( bizData ) {
      this.name = bizData.name;
      this.id = bizData.id;
      this.latLong = [bizData.coordinates.latitude, bizData.coordinates.longitude];
      this.price = bizData.price.length;
      this.delivery = bizData.transactions.includes('delivery');
      this.yelpUrl = bizData.url;
      this.imgUrls = [];
      this.isOpen = !(bizData.is_closed);

      Biz.all.push(this);
    }
    
    Biz.search = function(callback) {
      console.log('searching')
      $.ajax({
        url: '/yelp/search',
        type: 'GET',
        contentType: 'application/json',
        data: {
          term: 'delivery, food',
          location: 'Portland',
          radius: app.userSettings.distance,
          limit: 20,
          price: app.userSettings.price,
          open_now: app.userSettings.wantOpen,
        }
      })
      .then(Biz.storeSearchData,
        err => console.error(err));
    }
        
    Biz.storeSearchData = function(data) {
      data.forEach(business => {
        new Biz(business);
        Biz.fetchBusiness(business.id);
      });
    }
        
    Biz.fetchBusiness = function(thisID) {

      Biz.storeImages = function(data) {
        thisBiz = Biz.all.filter(business => business.id === thisID)[0];
        data.forEach(photo => thisBiz.imgUrls.push(photo));
        console.log(thisBiz);
      }

      $.ajax({
        url: '/yelp/business',
        type: 'GET',
        contentType: 'application/json',
        data: { id: thisID }
      })
      .then(Biz.storeImages, err => console.error(err));
    }



    module.Biz = Biz;
})(app);
app.Biz.search();