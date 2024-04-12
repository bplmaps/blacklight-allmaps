import L from "leaflet";
import "leaflet-fullscreen";
import { WarpedMapLayer } from "@allmaps/leaflet"
import LayerOpacityControl from "leaflet_layer_opacity";


import { initializeGeoBlacklightMap } from "./initialize_geoblacklight_map";
initializeGeoBlacklightMap();

import { initializeBlacklightMap } from "./initialize_blacklight_map";
initializeBlacklightMap();
