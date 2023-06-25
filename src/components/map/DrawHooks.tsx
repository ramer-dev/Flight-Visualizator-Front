import * as React from 'react';
import * as L from 'leaflet';
import { FeatureGroup } from 'react-leaflet';
import EditControl from './EditControl';
import type { FeatureCollection } from 'geojson';
import Drawer from './EditControl';

interface Props {
  geojson: FeatureCollection;
  setGeojson: (geojson: FeatureCollection) => void;
}

export default function EditControlFC({ geojson, setGeojson }: Props) {
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
    console.log(geo);
    if (geo?.type === 'FeatureCollection') {
      setGeojson(geo);
    }
  };

  return (
    <FeatureGroup ref={ref}>
      <Drawer
        position="topright"
        onEdited={handleChange}
        onCreated={handleChange}
        onDeleted={handleChange}
        draw={{
          rectangle: false,
          circle: true,
          polyline: true,
          polygon: true,
          marker: false,
          circlemarker: false,
        }}
      />
    </FeatureGroup>
  );
}

type DrawProp = {
    rectangle:boolean,
    circle:boolean,
    polyline:boolean,
    polygon:boolean,
    marker:boolean,
    circlemarker:boolean
}

type Prop = {
    position: string,
    onEdited: () => void;
    onCreated: () => void;
    onDeleted: () => void;
    draw: DrawProp;
}