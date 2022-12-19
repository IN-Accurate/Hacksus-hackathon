import React from "react";
import "./Home.css";
import axios from "axios";
import * as Yup from "yup";

import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Server() {
    const Mtruck = [];
    const Gtruck = [];
    const Ptruck = [];

    const [listOfWastes, setListOfWastes] = useState([]);
    const [listOfCoord, setListOfCoord] = useState([]);
    let navigate= useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3001/wastes/maps").then( (response) => {
        setListOfWastes(response.data);
      });
      axios.get("http://localhost:3001/coord/maps").then( (response) => {
        setListOfCoord(response.data);
      });
    }, []);
    

    {listOfWastes.map((value,key)=> {
      if(value.m > 0)
      {
        Mtruck.push({"lat": listOfCoord[key].lat,
        "lng": listOfCoord[key].lng
      });
      }
      if(value.p > 0)
      {
        Ptruck.push({"lat": listOfCoord[key].lat,
        "lng": listOfCoord[key].lng
        });
      }
      if(value.g > 0)
      {
        Gtruck.push({"lat": listOfCoord[key].lat,
        "lng": listOfCoord[key].lng
        });
      }
   });}

  var waypoints = []
    var map

    function optimizeM() {
      let i = 0;
      for(i=0; i<Mtruck.length; i++)
      {
        const coord = Mtruck[i];
        // console.log(coord);
        waypoints.push(coord);
        new tt.Marker().setLngLat(coord).addTo(map);
      }
      
      tt.services.calculateRoute({
        key: 'G3n7k1qeeVQBZyftR0uSratebx0VYCQz', // Get one for free at developer.tomtom.com
        locations: Mtruck,
        routeType: 'shortest',
        computeBestOrder: true
      })
        .then((result) => {
          
          console.log(result)
          const summary = document.getElementById('summary-optimize')
          summary.innerHTML = 'Distance optimize ' + result.routes[0].summary.lengthInMeters + ' mts'

          const geojson = result.toGeoJson()
          if (map.getLayer('optimized')) {
            map.removeLayer('optimized')
            map.removeSource('optimized')
          }
          map.addLayer({
            'id': 'optimized',
            'type': 'line',
            'source': {
              'type': 'geojson',
              'data': geojson
            },
            'paint': {
              'line-color': 'green',
              'line-width': 8
            }
          });
        })
    }

    function optimizeG() {
      let i = 0;
      for(i=0; i<Gtruck.length; i++)
      {
        const coord = Gtruck[i];
        // console.log(coord);
        waypoints.push(coord);
        new tt.Marker().setLngLat(coord).addTo(map);
      }
      
      tt.services.calculateRoute({
        key: 'G3n7k1qeeVQBZyftR0uSratebx0VYCQz', // Get one for free at developer.tomtom.com
        locations: Gtruck,
        routeType: 'shortest',
        computeBestOrder: true
      })
        .then((result) => {
          
          console.log(result)
          const summary = document.getElementById('summary-optimize')
          summary.innerHTML = 'Distance optimize ' + result.routes[0].summary.lengthInMeters + ' mts'

          const geojson = result.toGeoJson()
          if (map.getLayer('optimized')) {
            map.removeLayer('optimized')
            map.removeSource('optimized')
          }
          map.addLayer({
            'id': 'optimized',
            'type': 'line',
            'source': {
              'type': 'geojson',
              'data': geojson
            },
            'paint': {
              'line-color': 'blue',
              'line-width': 8
            }
          });
        })
    }

    function optimizeP() {
      let i = 0;
      for(i=0; i<Ptruck.length; i++)
      {
        const coord = Ptruck[i];
        // console.log(coord);
        waypoints.push(coord);
        new tt.Marker().setLngLat(coord).addTo(map);
      }
      
      tt.services.calculateRoute({
        key: 'G3n7k1qeeVQBZyftR0uSratebx0VYCQz', // Get one for free at developer.tomtom.com
        locations: Ptruck,
        routeType: 'shortest',
        computeBestOrder: true
      })
        .then((result) => {
          
          console.log(result)
          const summary = document.getElementById('summary-optimize')
          summary.innerHTML = 'Distance optimize ' + result.routes[0].summary.lengthInMeters + ' mts'

          const geojson = result.toGeoJson()
          if (map.getLayer('optimized')) {
            map.removeLayer('optimized')
            map.removeSource('optimized')
          }
          map.addLayer({
            'id': 'optimized',
            'type': 'line',
            'source': {
              'type': 'geojson',
              'data': geojson
            },
            'paint': {
              'line-color': 'red',
              'line-width': 8
            }
          });
        })
    }

    function showMap(center) {
      map = tt.map({
        key: 'G3n7k1qeeVQBZyftR0uSratebx0VYCQz',  // Get on for free at developer.tomtom.com
        container: 'map',
        center: center,
        zoom: 13,
        pitch: 25
      });

      // map.on('click', function (event) {
      //   const coord = event.lngLat
      //   waypoints.push(coord)
      //   new tt.Marker().setLngLat(coord).addTo(map)
      // })
    }

    tt.setProductInfo('<your-product-id>', '<your-product-version>')

    tt.services.fuzzySearch({
      key: 'G3n7k1qeeVQBZyftR0uSratebx0VYCQz',  // Get on for free at developer.tomtom.com
      query: 'kakkanad'
    }).then(function (response) {
      showMap(response.results[0].position)
    });

    return (  
      <div className="Mapscontainer"> 
        <button onClick={optimizeM}>Metal Truck</button> <button onClick={optimizeG}>Glass Truck</button> <button onClick={optimizeP}>Paper Truck</button>
        <div id='map'></div>
        <div id='summary-optimize'></div>
      </div>
      );
}

export default Server