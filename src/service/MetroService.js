import { Marker, Polyline } from 'react-native-maps';

export function findStopByID(stops, id) {
  for (stop of stops) {
    if (stop.StopIDs.includes(id)) return stop;
  }
}

export function getMarkerFromStop(metroStops, stopId, line, markers) {
  const stop = findStopByID(metroStops, stopId);
  return (
    <Marker
      key={`${line.name}#${stopId}`}
      coordinate={{
        latitude: stop.Latitude,
        longitude: stop.Longitude,
      }}
      title={stop.StopText}
      image={markers[stop.CustomMarker || line.name]}
    />
  );
}

export function getPolylineFromLine(metroStops, line) {
  const coordinates = [];
  line.stops[0].forEach(stopId => {
    const stop = findStopByID(metroStops, stopId);
    coordinates.push({
      latitude: stop.Latitude,
      longitude: stop.Longitude,
    });
  });
  return (
    <Polyline key={line.name} coordinates={coordinates} strokeColor={line.color} strokeWidth={3} />
  );
}
