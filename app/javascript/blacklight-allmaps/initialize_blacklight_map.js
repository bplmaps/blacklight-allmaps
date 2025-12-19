// initialize_blacklight_map.js
// import L from "leaflet";
import "leaflet";
import "leaflet-fullscreen";
import LayerOpacityControl from "blacklight-allmaps/leaflet_layer_opacity";
import "@allmaps/leaflet";

export function initializeBlacklightMap() {
  document.addEventListener("turbo:load", () => {
    if (document.getElementById("blacklight-allmaps-map") != null) {
      const element = document.getElementById("blacklight-allmaps-map");
      const allmaps_id = element.getAttribute("data-allmaps-id");
      const geoTab = document.getElementById("georeferenced-tab-content");
      if (!element) return; // Exit if the element doesn't exist

      const map = L.map("blacklight-allmaps-map", {
        center: [0, 0],
        zoom: 8,
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
      const warpedMapLayer = new Allmaps.WarpedMapLayer(annotationUrl).addTo(map);

      // Layer opacity control
      map.addControl(new LayerOpacityControl(warpedMapLayer));

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
// app/javascript/blacklight/allmaps/initialize_blacklight_map.js
