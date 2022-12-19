
import React from "react";
import "./Home.css";
import axios from "axios";
import * as Yup from "yup";

import {useState} from "react";
import {useNavigate} from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";

function Home() { 

  let navigate=useNavigate();
  const initialValues = {
    address: "",
    username: "",
    distance: 0,
    m: 0,
    g: 0,
    p: 0,
  };

  const onSubmit = (data) => {
    console.log("Data : ");
    console.log(data);
    axios.post("http://localhost:3001/wastes",data).then((response) => {
      
    });
  };


  var waypoints = []
    var map

    function optimize() {
      tt.services.calculateRoute({
        key: 'G3n7k1qeeVQBZyftR0uSratebx0VYCQz', // Get one for free at developer.tomtom.com
        locations: waypoints,
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

    function showMap(center) {
      map = tt.map({
        key: 'G3n7k1qeeVQBZyftR0uSratebx0VYCQz',  // Get on for free at developer.tomtom.com
        container: 'map',
        center: center,
        zoom: 13,
        pitch: 25
      });

      map.on('click', function (event) {
        const coord = event.lngLat
        console.log(coord);
        waypoints.push(coord);
        new tt.Marker().setLngLat(coord).addTo(map)
        axios.post("http://localhost:3001/coord",coord).then((response) => {
      
         });
      })
    }

    function route() {
      tt.services.calculateRoute({
        key: 'G3n7k1qeeVQBZyftR0uSratebx0VYCQz', // Get on for free at developer.tomtom.com
        routeType: 'shortest',
        locations: waypoints
      })
        .then((result) => {
          console.log(result)
          const summary = document.getElementById('summary-route')
          summary.innerHTML = 'Distance route ' + result.routes[0].summary.lengthInMeters + ' mts'
          const geojson = result.toGeoJson()
          if (map.getLayer('route')) {
            map.removeLayer('route')
            map.removeSource('route')
          }

          map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': {
              'type': 'geojson',
              'data': geojson
            },
            'paint': {
              'line-color': 'orange',
              'line-width': 8
            }
          });
        })
    }


    tt.setProductInfo('<your-product-id>', '<your-product-version>')

    tt.services.fuzzySearch({
      key: 'G3n7k1qeeVQBZyftR0uSratebx0VYCQz',  // Get on for free at developer.tomtom.com
      query: 'kakkanad'
    }).then(function (response) {
      showMap(response.results[0].position)
    });

  return (
    <div className="homeContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form className="formContainer">
          <label htmlFor="username">Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="username"
            name="username"
            placeholder="Username Here"
          />
          <br/>
          <label htmlFor="address">Address:</label>
          <ErrorMessage name="address" component="span" />
          <Field
            autoComplete="off"
            id="address"
            name="address"
            placeholder="Address Here"
          />
          <br/>

          <p>Enter Waste Quantity in KGs here</p>
          <label htmlFor="m">Metal: </label>
          <ErrorMessage name="m" component="span" />
          <Field
            autoComplete="off"
            id="m"
            name="m"
            placeholder="Metal waste Here"
          />
          <br/>
          <label htmlFor="g">Glass:</label>
          <ErrorMessage name="g" component="span" />
          <Field
            autoComplete="off"
            id="g"
            name="g"
            placeholder="Glass waste Here"
          />
          <br/>
          <label htmlFor="p">Paper:</label>
          <ErrorMessage name="p" component="span" />
          <Field
            autoComplete="off"
            id="p"
            name="p"
            placeholder="Paper waste Here"
          />
          <br/>
        <button type="submit">Order Truck</button>
        </Form>
      </Formik>

      <br/>
      <h1>Choose your location in the map: </h1>
      <div className="Mapscontainer"> 
        <div id='map'></div>
        <div id='summary-route'></div>
        <div id='summary-optimize'></div>
        <button >Confirm</button>
      </div>

    </div>
  );
}

export default Home;
