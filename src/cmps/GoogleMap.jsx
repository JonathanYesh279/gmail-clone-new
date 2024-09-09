import GoogleMapReact from 'google-map-react'


function Marker() {
  return <div style={{ color: 'red', fontSize: '30px' }}>📍</div>
}

export function GoogleMap({ lat, lng }) {
  const defaultProps = {
    center: {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    },
    zoom: 11,
  };

  return (
    <div style={{ height: '200px', width: '70%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key:'AIzaSyAsNrbwy4uAfVLZ0kpoN-yGUPUxiSw6gz0' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={lat}
          lng={lng}
        />
      </GoogleMapReact>
    </div>
  )
}