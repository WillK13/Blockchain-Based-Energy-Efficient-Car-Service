var directionsDisplay;
        var directionsService ;
        var map;
function haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
  }
        function initialize() {
            directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
            var mapOptions = {
                zoom: 14,
                center: new google.maps.LatLng(40.713066, -73.993889)
            };
            map = new google.maps.Map(document.getElementById('map-canvas'),
               mapOptions);
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('directions-panel'));

            var control = document.getElementById('control');
            control.style.display = 'block';
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control);
            geocoder = new google.maps.Geocoder();

    const inputText = document.createElement("input");

    inputText.type = "text";
    inputText.placeholder = "Current or future location";

    const submitButton = document.createElement("input");

    submitButton.type = "button";
    submitButton.value = "Geocode";
    submitButton.classList.add("button", "button-primary");

    const clearButton = document.createElement("input");

    clearButton.type = "button";
    clearButton.value = "Redo";
    clearButton.classList.add("button", "button-secondary");
    response = document.createElement("pre");
    response.id = "response";
    response.innerText = "";
    responseDiv = document.createElement("div");
    responseDiv.id = "response-container";
    responseDiv.appendChild(response);



    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(inputText);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(submitButton);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(clearButton);
    //map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
    user1 = new google.maps.Marker({
      map,
      icon: {
        url: 'http://www.clker.com/cliparts/k/w/Q/w/L/m/map-marker-location.svg.hi.png',
        size: new google.maps.Size(40, 42),
        scaledSize: new google.maps.Size(40, 42),
      }
    });




    // map.addListener("click", (e) => {
    //   geocode({ location: e.latLng });
    // });
    submitButton.addEventListener("click", () =>
      geocode({
        address: inputText.value
      })
    );
    clearButton.addEventListener("click", () => {
      clear();
    });
    clear();
        }
        var arrayOfTrackingPoints = [];
        function calcRoute() {
            var start = document.getElementById('start').value;
            var end = user1.getPosition();
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setOptions({
  polylineOptions: {
    strokeColor: 'white'
  }
});
                    for (var i = 0; i < response.routes[0].overview_path.length; ++i) {
                        /*  marker = new google.maps.Marker({
                              map: map,
                              position: new google.maps.LatLng
                              (response.routes[0].overview_path[i].lat(), 
                              response.routes[0].overview_path[i].lng()),
                              animation: google.maps.Animation.BOUNCE
                          });*/
                        arrayOfTrackingPoints.push(new google.maps.LatLng
                        (response.routes[0].overview_path[i].lat(), 
                        response.routes[0].overview_path[i].lng()));
                    }
                }
            });
            showTracking();
        }
        var markerArray = [];
       // var infowindow = new google.maps.InfoWindow();
        function showTracking() {
            var marker = new google.maps.Marker({
                map: map,
                position: arrayOfTrackingPoints[0],
                icon: {
        url: 'http://www.clker.com/cliparts/3/Y/D/y/o/r/small-purple-dot-md.png',
      size: new google.maps.Size(17, 17),
      scaledSize: new google.maps.Size(17, 17),
        }

            });
            var c = 0;
            var interval = self.setInterval(function () {

                marker.setPosition((arrayOfTrackingPoints[c]));
                c = c + 2;
              //  markerArray.push(marker);
            //   infowindow.setContent('The marker number is : ' + c);
           //  infowindow.open(map, marker);
                if (c > arrayOfTrackingPoints.length) clearInterval(interval);
            }, 1000);


            ////window.setInterval(clearOverlays, 9500);
            //var counterForClearing = 0;
            //var clearMarkersInterval = self.setInterval(function () {
            //    for (var j = 0; j < markerArray.length; ++j) {
            //        markerArray[j].setMap(null);
            //    }
            //    counterForClearing++;
            //    if (counterForClearing > markerArray.length) clearInterval(clearMarkersInterval);
            //}, 9500);
        }
        function clear() {
    user1.setMap(null);
    responseDiv.style.display = "none";
  }


  function geocode(request) {
    clear();
    geocoder
      .geocode(request)
      .then((result) => {
        const {
          results
        } = result;

        map.setCenter(results[0].geometry.location);
        user1.setPosition(results[0].geometry.location);
        user1.setMap(map);
        responseDiv.style.display = "block";
        response.innerText = JSON.stringify(result, null, 2);
        const newplace = user1.getPosition();


        //   var line = new google.maps.Polyline({path: [newplace, ice], map: map});

        
        
        return results;
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });

const newplace = user1.getPosition();
const testing = document.getElementById('start').value;
        var distance0 = haversine_distance(newplace, testing);


    document.getElementById('msg').innerHTML = "Distance between markers: " + arr.min().toFixed(2) + " mi.";
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map); // Existing map object displays directions


    // Create route from existing points used for markers
    const route = {
      origin: newplace,
      destination: ice,
      travelMode: 'DRIVING'
    }

    directionsService.route(route,
      function(response, status) { // anonymous function to capture directions
        if (status !== 'OK') {
          window.alert('Directions request failed due to ' + status);
          return;
        } else {
          directionsRenderer.setDirections(response); // Add route to the map
          var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
          if (!directionsData) {
            window.alert('Directions request failed');
            return;
          } else {
            document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
          }
        }
      });

  }
  //window.initMap = initMap;



