/* eslint-disable */
console.log('hello motherfucker');

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
   'pk.eyJ1Ijoic2lidS1kaGl0YWwiLCJhIjoiY2xiOHphNWRwMG85dDNvcnM5b3I1eGdkcSJ9.WbdBRzIMvM88bA-KvmN6IA';
var map = new mapboxgl.Map({
   container: 'map', // container ID
   style: 'mapbox://styles/sibu-dhital/clb8zpr1l005h14prbsxi2flc', // style URL
   center: [-118.113491, 34.111745], // starting position [lng, lat]
   zoom: 9, // starting zoom
   scrollZoom: false,
});

const bound = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
   const el = document.createElement('div');
   el.className = 'marker';
   new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
   })
      .setLngLat(loc.coordinates)
      .addTo(map);

   new mapboxgl.popUp({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
   bound.extends(loc.coordinates);
});

map.fitBounds(bound, {
   padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100,
   },
});
