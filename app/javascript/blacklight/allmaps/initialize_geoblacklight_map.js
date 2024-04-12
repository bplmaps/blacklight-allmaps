// initialize_geoblacklight_map.js
import L from 'leaflet';
import 'leaflet-fullscreen';
import LayerOpacityControl from 'leaflet_layer_opacity';
import { WarpedMapLayer } from '@allmaps/leaflet';

export function initializeGeoBlacklightMap() {
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("geoblacklight-allmaps-map") != null) {
      const element = document.getElementById("geoblacklight-allmaps-map");
      const allmaps_id = element.getAttribute("data-allmaps-id");
      const geoTab = document.getElementById("georeferenced-tab");
      if (!element) return; // Exit if the element doesn't exist

      const map = L.map("geoblacklight-allmaps-map", {
        center: [0, 0],
        zoom: 15,
        zoomAnimationThreshold: 1
      });

      // Basemap and Attribution
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
        maxZoom: 18
      }).addTo(map);
  
      // Fullscreen control
      map.addControl(new L.Control.Fullscreen({
        position: "topright"
      }));

      // Annotation URL assumes the ID is passed dynamically to this function
      const annotationUrl = `https://annotations.allmaps.org/manifests/${allmaps_id}`;
      const warpedMapLayer = new WarpedMapLayer(annotationUrl).addTo(map);

      // Layer opacity control
      map.addControl(new LayerOpacityControl(warpedMapLayer));

      // Watch DOM to see active tab and
      // Resize map to render correctly
      const observer = new MutationObserver(function() {
        if (geoTab.style.display !== "none") {
          map.invalidateSize();
          warpedMapLayer.addTo(map);
          map.fitBounds(warpedMapLayer.getBounds());
        }
      });

      observer.observe(geoTab, { attributes: true });
    }
  });
}
// app/javascript/blacklight/allmaps/initialize_geoblacklight_map.js