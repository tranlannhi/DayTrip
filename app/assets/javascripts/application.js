// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

// require bootstrap.min


    function dayTripper($scope, $http, $route) {


        $scope.directionsDisplay = new google.maps.DirectionsRenderer({ draggable: false });
        $scope.directionsService = new google.maps.DirectionsService();
        $scope.placeDetails = new Array();
        $scope.numPointsAlongRoute = 10;
        $scope.numPlacesPerPoint = 3;
        //$scope.apiDelay = 1000;
        $scope.placesSearch;
        $scope.infowindow = new google.maps.InfoWindow();

        // $scope.markers = [];
        $scope.bounds = new google.maps.LatLngBounds ();
        $scope.waypoints = [];
        $scope.selectedPlaces = [];
        $scope.latlongArr = [];
        $scope.savePlaces = [];
        /*
        google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {

          });
        */



        $scope.init = function() {

            var myOptions = {
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: new google.maps.LatLng(34.017708, -118.479693)
            };

            $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            $scope.placesService = new google.maps.places.PlacesService($scope.map);
            $scope.directionsDisplay.setMap($scope.map);
            $scope.directionsDisplay.setPanel(document.getElementById("directions"));

        }

        $scope.calcRoute = function() {

            //$scope.getYelp('Food');

            //var latlangArr = [];
            $scope.getSelectedPlaces();

            if ($scope.selectedPlaces != null) {
              for (var i = 0; i < $scope.selectedPlaces.length; i++) {
                console.log("Building lat long array...");
                console.log($scope.selectedPlaces);
                $scope.latlongArr.push(
                  {
                    location: new google.maps.LatLng($scope.selectedPlaces[i][0].latitude, $scope.selectedPlaces[i][0].longitude),
                    stopover: true
                  }
                );
              }
              
              console.log("Lat Long Arr:");
              console.log($scope.latlongArr);
            }

            // clear placeDetails only after grabbing wayponts
            $scope.placeDetails = [];
            $scope.waypoints = [];

            var request = {
                origin: $scope.routeFrom,
                destination: $scope.routeTo,
                waypoints: $scope.latlongArr,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode["DRIVING"]
            };

            $scope.directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    $scope.directionsDisplay.setDirections(response);
                    console.log("Route Response:");
                    console.log(response);

                    var allPoints = response.routes[0].overview_path;
                    var selectedPoints = $scope.cherryPickPoints(allPoints, $scope.numPointsAlongRoute);

                    for (var i = 0; i < selectedPoints.length; i++) {
                        //$scope.findPlaces(selectedPoints[i].B, selectedPoints[i].k);
                        $scope.getYelp(selectedPoints[i].k, selectedPoints[i].B);
                    }
                }
            });


        }

        $scope.search = function() {
           //$scope.placeDetails = [];
          
           
           for (var i = 0; i < $scope.waypoints.length; i++) {
              $scope.savePlaces.push($scope.getPlaceById($scope.waypoints[i]));
            }
            console.log("savePlaces");
            console.log($scope.savePlaces);
             $scope.calcRoute();
        };

        $scope.toggleWaypoint = function(checked, waypointId) {

          console.log("Checked?: " + checked + ", Id: " + waypointId);
          
          if (checked == true) {
            $scope.addToWaypoints(waypointId);
          }
          else {
            $scope.removeFromWaypoints(waypointId);
          }

          $scope.getSelectedPlaces();
        }

        $scope.getSelectedPlaces = function() {
          if ($scope.waypoints != null) {
            $scope.selectedPlaces = [];

            for (var i = 0; i < $scope.waypoints.length; i++) {
              $scope.selectedPlaces.push($scope.getPlaceById($scope.waypoints[i]));
              
            }

            console.log("Selected Places:");
            console.log($scope.selectedPlaces);
          }
        }

        $scope.getPlaceById = function(id) {
          return $.grep($scope.placeDetails, function(e){ return e.id == id; });

          // for (var i = 0; i < $scope.placeDetails.length; i++) {
          //   if ($scope.placeDetails[i].id == id) {
          //     return $scope.placeDetails[i];
          //   }
          // }

          // return null;
        }

        $scope.addToWaypoints = function(id) {
          console.log("Adding Waypoint...");
          $scope.waypoints.push(id);
        }

        $scope.removeFromWaypoints = function(id) {
          console.log("Removing Waypoint...");
          var index = $scope.waypoints.indexOf(id);

          if (index > -1) {
              $scope.waypoints.splice(index, 1);
          }
        }


        // toggle selection for a given fruit by name
        $scope.toggleSelection = function toggleSelection(waypoint) {
          var idx = $scope.selectedWaypoints.indexOf(waypoint);

          // is currently selected
          if (idx > -1) {
            $scope.waypoints.splice(idx, 1);
          }

          // is newly selected
          else {
            $scope.waypoints.push(waypoint);
          }
        };



        //function to get data from YELP
        $scope.getYelp = function(lat, lng)
        {
            console.log("In getYelp()");


            $.getJSON('http://api.yelp.com/business_review_search?lat='+lat+'&long='+lng+'&limit=' + $scope.numPlacesPerPoint + '&sort=2&ywsid=ynoYeq0HNwWfPKFRqK-5qg&term='+$scope.placesSearch+'&callback=?',
                function(data)
                {

                    console.log("Yelp Response");
                    console.log(data);


                    for (var i = 0; i < data.businesses.length; i++) {
                        $scope.placeDetails.push(data.businesses[i]);
                        //$scope.waypoints.push(data.businesses[i]);

                        $scope.createPlacesMarker(data.businesses[i]);

                        $scope.$apply(); // necessary to update list
                    }

                }
            );

        }



        //Function to create yelp marker
        $scope.createPlacesMarker = function(business)
        {
            console.log("Business:");
            console.log(business);
            //var yelpContent = "Hello";


            infowindowcontent = '<strong>'+business.name+'</strong><br>';
            infowindowcontent += '<img src="'+business.photo_url+'"><br>';
            infowindowcontent += '<a href="'+business.url+'" target="_blank">see it on yelp</a>';
            infowindowcontent += '<strong>Rating ' + business.avg_rating+'</strong><br>';

            var markerLatLng = new google.maps.LatLng(business.latitude, business.longitude);
            var infowindow = new google.maps.InfoWindow({
                content: infowindowcontent
            });



            var marker =  new google.maps.Marker({
                position: markerLatLng,
                map: $scope.map,
                title: business.name,
                icon: '/assets/marker.jpg'
            });


            //add an onclick event
            google.maps.event.addListener(marker,'click', function() {
                
                // infowindow.setContent(infowindowcontent);
                infowindow.open($scope.map, marker);
            });

        }


        $scope.clearDirections = function() {
            //$scope.directionsDisplay.setDirections({ routes: [] });
            $route.reload();
        }

        $scope.cherryPickPlaces = function(places, limit) {
            var selectedPlaces = $scope.splitArray(places, limit);
            console.log("Selected Places:");
            console.log(selectedPlaces);

            var rtn = new Array();
            for (var i = 0; i < selectedPlaces.length; i++) {
                rtn.push(selectedPlaces[i][0]);
            }
            return rtn;
        }

        $scope.cherryPickPoints = function(points, limit) {
            var selectedPoints = $scope.splitArray(points, limit);
            console.log("Selected Points:");
            console.log(selectedPoints);

            var rtn = new Array();
            for (var i = 0; i < selectedPoints.length; i++) {
                rtn.push(selectedPoints[i][0]);
            }
            return rtn;
        }

        $scope.splitArray = function(arr, chunkSize) {
            var len = arr.length,out = [], i = 0;

            while (i < len) {
                var size = Math.ceil((len - i) / chunkSize--);
                out.push(arr.slice(i, i += size));
            }

            return out;
        }


        $scope.init();

        //google.maps.event.addDomListener(window, 'load', initialize);
    }







