jQuery(document).ready(function($) {
  var url = 'http://resources.opendatalabs.org/datasets/crime-uk/cache/streets.csv';
  // var url = 'http://localhost/dps/crime-uk/cache/streets.csv';
  var dataset = new recline.Model.Dataset({
    url: url,
    backend: 'csv'
  });
  var $el = $('.crime-map');
  dataset.fetch().done(function() {
    var map = new recline.View.Map({
      model: dataset,
      el: $el,
      state: {
        latField: 'Latitude',
        lonField: 'Longitude'
      }
    });
    console.log(dataset);
    map.render();
    dataset.query({size: 10000});
  });
});
