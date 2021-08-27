import React, { Fragment, useEffect, useState } from "react";
import isEmpty from "lodash.isempty";
import Sidebar from "../../components/Navigation/Sidebar";
import Topbar from "../../components/Navigation/Topbar";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import socketIOClient from "socket.io-client";
import moment from "moment";
import Timeline from "../../components/Timeline";
import { Modal, Button } from "react-bootstrap";
import { Show } from "../../hooks/Show";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const Routing = () => {
  const [locations, setLocations] = useState([]);
  const [mapRef, setMapRef] = useState(null);
  const [center] = useState({ lat: 44.076613, lng: -98.362239833 });
  const [zoom, setZoom] = useState(3);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAdmugE-_W9ZzvD8kCJ-MOfsJJFSRS7s3k",
  });

  let [directions, setDirections] = useState("");
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(null);

  const [showTimeline, setShowTimeline] = useState(false);
  const [idAddressSelected, setIdAddressSelected] = useState(null);

  const handleOpenTimeline = (id) => {
    setIdAddressSelected(id);
    setShowTimeline(true);
  }

  const handleCloseTimeline = () => {
    setIdAddressSelected(null);
    setShowTimeline(false);
  }

  const [locationSelected, setLocationSelected] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
    socket.on("locations", (data) => {
      setLocations(data);
    });

    return () => socket.disconnect();
  }, []);


  const fitBounds = (map) => {
    if (!isEmpty(locations) && locationSelected == null) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend(
          new window.google.maps.LatLng(location.latitude, location.longitude)
        );
      });
      map.fitBounds(bounds);
    } else if (route != null && locationSelected != null) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(
        new window.google.maps.LatLng(
          locationSelected.latitude,
          locationSelected.longitude
        )
      );
      route.forEach((location) => {
        bounds.extend(
          new window.google.maps.LatLng(location.lat, location.lon)
        );
      });
      map.fitBounds(bounds);
    } else {
      map.setCenter({ lat: 44.076613, lng: -98.362239833 });
      map.setZoom(3);
    }
  };

  const loadHandler = (map) => {
    setMapRef(map);
    fitBounds(map);
  };

  const getStatusDelivery = (id) => {
    // eslint-disable-next-line default-case
    switch (id) {
      case -1:
        return <span className="badge badge-pill badge-danger">Falló</span>;
        break;
      case 1:
        return (
          <span className="badge badge-pill badge-success">Procesado</span>
        );
        break;
      case 2:
        return (
          <span className="badge badge-pill badge-success">
            Actualizado
          </span>
        );
        break;
      case 3:
        return (
          <span className="badge badge-pill badge-warning">Programado</span>
        );
        break;
      case 4:
        return (
          <span className="badge badge-pill badge-warning">En ruta</span>
        );
        break;
      case 5:
        return (
          <span className="badge badge-pill badge-success">Entregado</span>
        );
        break;
      case 6:
        return (
          <span className="badge badge-pill badge-danger">No entregado</span>
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isLoaded && mapRef) {
      fitBounds(mapRef);
    }
  }, [locations]);

  useEffect(() => {
    function fetchRoute() {
      try {
        let now = new Date();
        var dateString = moment(now).format("MM-DD-YYYY");
        fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/routes/currentRoute?idCourier=${locationSelected.userId}&date=${dateString}`,
          {
            method: "GET",
            headers: new Headers({
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setRoute(data.route);
          });
      } catch (e) {
        // Logout the user and redirect to the login page
      }
    }

    const intervalId = setInterval(() => {
      fetchRoute();
    }, 1000 * 5);
    return () => clearInterval(intervalId);
  }, [route]);

  useEffect(() => {
    if (locationSelected) {
      let now = new Date();
      var dateString = moment(now).format("MM-DD-YYYY");

      fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${locationSelected.userId}`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((e) => {
          console.log(e);
        });

      fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/routes/currentRoute?idCourier=${locationSelected.userId}&date=${dateString}`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data != null && data.route) {
            let { 0: first, length: l, [l - 1]: last } = data.route;
            var service = new window.google.maps.DirectionsService();

            // list of points
            var addresses = [];

            // add initial position route
            addresses.push({
              lat: parseFloat(data.company.lat),
              lng: parseFloat(data.company.lon),
              name: data.company.description,
            });

            // add others position
            data.route.forEach((elem) => {
              addresses.push({
                lat: parseFloat(elem.lat),
                lng: parseFloat(elem.lon),
                name: elem.direction,
              });
            });

            // add last position
            addresses.push({
              lat: parseFloat(last.lat),
              lng: parseFloat(last.lon),
              name: last.direction,
            });

            // Zoom and center map automatically by stations (each station will be in visible map area)
            var lngs = addresses.map(function (station) {
              return station.lng;
            });
            var lats = addresses.map(function (station) {
              return station.lat;
            });
            mapRef.fitBounds({
              west: Math.min.apply(null, lngs),
              east: Math.max.apply(null, lngs),
              north: Math.min.apply(null, lats),
              south: Math.max.apply(null, lats),
            });

            // Show stations on the map as markers
            for (var i = 0; i < addresses.length; i++) {
              new window.google.maps.Marker({
                position: addresses[i],
                map: mapRef,
                title: addresses[i].name,
              });
            }

            // Divide route to several parts because max stations limit is 25 (23 waypoints + 1 origin + 1 destination)
            for (
              var i = 0, parts = [], max = 25 - 1;
              i < addresses.length;
              i = i + max
            )
              parts.push(addresses.slice(i, i + max + 1));

            // Service callback to process service results
            var service_callback = function (response, status) {
              if (status != "OK") {
                console.log("Directions request failed due to " + status);
                return;
              }
              var renderer = new window.google.maps.DirectionsRenderer();
              if (!window.gRenderers) window.gRenderers = [];
              window.gRenderers.push(renderer);
              renderer.setMap(mapRef);
              renderer.setOptions({
                suppressMarkers: true,
                preserveViewport: true,
              });
              renderer.setDirections(response);
            };

            // Send requests to service to get route (for stations count <= 25 only one request will be sent)
            for (var i = 0; i < parts.length; i++) {
              // Waypoints does not include first station (origin) and last station (destination)
              var waypoints = [];
              for (var j = 1; j < parts[i].length - 1; j++)
                waypoints.push({ location: parts[i][j], stopover: false });
              // Service options
              var service_options = {
                origin: parts[i][0],
                destination: parts[i][parts[i].length - 1],
                waypoints: waypoints,
                travelMode: window.google.maps.TravelMode.DRIVING,
              };
              // Send request
              service.route(service_options, service_callback);
            }

            setRoute(data.route);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [locationSelected]);

  const resetRoute = () => {
    if (window.gRenderers) {
      for (var r of window.gRenderers) {
        r.setMap(null);
      }
    }

    if (mapRef) {
      mapRef.data.forEach((feature) => {
        if (feature.getGeometry().getType() === "Point") {
          mapRef.data.remove(feature);
        }
      });
    }
  };

  const renderMap = () => {
    return (
      <div className="row">
        <div className={locationSelected ? "col-md-8" : "col-md-12"}>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Rutas en tiempo real
              </h6>
            </div>
            <div className="card-body">
              <div className="container-fluid p-0 overflow-hidden">
                <div className="row no-gutters">
                  <div className="col-md-12">
                    <GoogleMap
                      onLoad={loadHandler}
                      center={center}
                      zoom={zoom}
                      mapContainerStyle={{
                        height: "465px",
                        width: "100%",
                      }}
                    >
                      {locationSelected == null &&
                        locations.map((location, key) => (
                          <Marker
                            key={key}
                            position={{
                              lat: location.latitude,
                              lng: location.longitude,
                            }}
                            icon={"messenger.png"}
                            onClick={() => {
                              setLocationSelected(location);
                            }}
                          />
                        ))}
                      {locationSelected != null &&
                        locations
                          .filter(
                            (location) => location.userId === locationSelected.userId
                          )
                          .map((location, key) => (
                            <Marker
                              key={key}
                              position={{
                                lat: location.latitude,
                                lng: location.longitude,
                              }}
                              icon={"messenger.png"}
                              onClick={() => {
                                setLocationSelected(location);
                              }}
                            />
                          ))}
                    </GoogleMap>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {locationSelected && (
          <div className="col-md-4">
            <div className="card shadow mb-4">
              <div className="card-header  d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Detalle ruta
                </h6>
                <button
                  className="btn btn-link"
                  title="Cerrar"
                  type="button"
                  onClick={() => {
                    resetRoute();
                    setDirections("");
                    setRoute(null);
                    setUser(null);
                    setLocationSelected(null);
                    fitBounds(mapRef);
                  }}
                >
                  Cerrar
                </button>
              </div>
              <div className="card-body">
                <div className="container-fluid p-0 overflow-hidden">
                  <div className="row no-gutters">
                    {locationSelected && (
                      <div className="col-md-12">
                        {user != null && (
                          <div className="mb-3">
                            <div className="list-group-item d-flex justify-content-between lh-condensed ">
                              <div>
                                <h6 className="my-0 font-weight-bold">
                                  {user.firstName + " " + user.lastName}
                                </h6>
                                <small className="text-muted">
                                  CC. {user.documentNumber}
                                </small>
                              </div>
                            </div>
                          </div>
                        )}
                        {route != null && (
                          <ul className="list-group mb-3 list-items-route">
                            {route.map((ele, key) => (
                              <li
                                key={key}
                                className="list-group-item d-flex justify-content-between lh-condensed"
                              >
                                <div>
                                  <h6 className="my-0 font-weight-bold">{ele.name}</h6>
                                  <h6 className="my-0 text-muted">{ele.direction}</h6>
                                  <small className="text-muted">
                                    {ele.reference1}
                                  </small>{" "}
                                  <small className="text-muted">{ele.reference2}</small>
                                  <div className="text-muted">
                                    {getStatusDelivery(ele.state)}
                                  </div>
                                </div>
                                <span className="address-status">
                                  <Show when="feature:see-timeline">
                                    <button
                                      title="Timeline"
                                      className="btn btn-primary btn-sm  btn-circle mr-2"
                                      type="button"
                                      onClick={(e) => handleOpenTimeline(ele.idAddress)}
                                    >
                                      <i className="fas fa-info fa-xs"></i>
                                    </button>
                                  </Show>
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center mb-1">
                <h1 className="h3 mb-0 text-gray-800 mr-3">Rutas</h1>
              </div>
              <p className="mb-4">Módulo de visualización de rutas</p>
              <div>
                {isLoaded ? renderMap() : null}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Modal
            size="xl"
            show={showTimeline}
            onHide={handleCloseTimeline}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Timeline
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Timeline idAddress={idAddressSelected}></Timeline>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Routing;
