var base = 'http://assets.okfnlabs.org/datasets/crime-uk/cache/csv/';
// var base = 'http://localhost/datasets/crime-uk/cache/csv/';

jQuery(document).ready(function($) {
  window.map = null;

  var month = '2012-08';

  $('.forces select').change(function(e) {
    var force = $(e.target).find('option:selected').val();
    showMap(force, month);
  });
  $('.forces select').chosen();

  // finally trigger the select with our default value
  $('.forces select').val('city-of-london').trigger('liszt:updated');
  $('.forces select').change();
});

function showMap(force, month) {
  var url = base + month + '-' + force + '-street.zip.csv';
  var dataset = new recline.Model.Dataset({
    url: url,
    backend: 'csv'
  });
  var $el = $('.crime-map');
  dataset.fetch().done(function() {
    if (window.map) {
      window.map.remove();
    }
    window.map = new recline.View.Map({
      model: dataset,
      state: {
        latField: 'Latitude',
        lonField: 'Longitude'
      }
    });
    $el.append(map.el);
    window.map.render();
    dataset.query({size: 10000});
  });
}

