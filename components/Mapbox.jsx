import { useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getCenter } from 'geolib'

function Mapbox({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({})
  //   transform the searchResults prop object into the {latitude: 0000, longitude: 0000} object that getCenter takes in
  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }))

  const center = getCenter(coordinates)

  const [viewState, setViewState] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  })

  return (
    <Map
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/davidvekony/cl1lufok8003614lnyrbejer0"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            anchor={'bottom-left'}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
            >
              📌
            </p>
          </Marker>
          {/* The tooltip that should show if we click on a Marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </Map>
  )
}

export default Mapbox
