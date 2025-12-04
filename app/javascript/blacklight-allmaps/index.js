import L from "leaflet";
import "leaflet-fullscreen";
import { WarpedMapLayer } from "@allmaps/leaflet"
import LayerOpacityControl from "blacklight-allmaps/leaflet_layer_opacity";


import { initializeGeoBlacklightMap } from "blacklight-allmaps/initialize_geoblacklight_map";
initializeGeoBlacklightMap();

import { initializeBlacklightMap } from "blacklight-allmaps/initialize_blacklight_map";
initializeBlacklightMap();

import { updateGeorefLinks } from 'blacklight-allmaps/update_georef_links';

document.addEventListener('turbo:load', () => {
  updateGeorefLinks();
});
