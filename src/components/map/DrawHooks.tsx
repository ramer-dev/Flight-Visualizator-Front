import * as React from 'react';
import * as L from 'leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from './draw'
import type { FeatureCollection } from 'geojson';
import 'leaflet-draw/dist/leaflet.draw.css'

interface Props {
    geojson: FeatureCollection;
    setGeojson: (geojson: FeatureCollection) => void;
  }

export default function EditControlFC({geojson, setGeojson} : Props) {
  const ref = React.useRef<L.FeatureGroup>(null);

  React.useEffect(() => {
    if (ref.current?.getLayers().length === 0 && geojson) {
      L.geoJSON(geojson).eachLayer((layer) => {
        if (
          layer instanceof L.Polyline ||
          layer instanceof L.Polygon ||
          layer instanceof L.Marker
        ) {
          if (layer?.feature?.properties.radius && ref.current) {
            new L.Circle(layer.feature.geometry.coordinates.slice().reverse(), {
              radius: layer.feature?.properties.radius,
            }).addTo(ref.current);
          } else {
            ref.current?.addLayer(layer);
          }
        }
      });
    }
  }, [geojson]);

  const handleChange = () => {
    const geo = ref.current?.toGeoJSON();
    if (geo?.type === 'FeatureCollection') {
      setGeojson(geo);
    }
  };

  return (
    <FeatureGroup ref={ref}>
      <EditControl
        position="topright"
        onEdited={handleChange}
        onCreated={handleChange}
        onDeleted={handleChange}
        draw={{
          rectangle: true,
          circle: true,
          polyline: true,
          polygon: true,
          marker: true,
          circlemarker: false,
        }}
      />
    </FeatureGroup>
  );
}