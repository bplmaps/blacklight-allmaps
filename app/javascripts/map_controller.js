// map_controller.js
import { Controller } from "@hotwired/stimulus"
import L from 'leaflet'
import { WarpedMapLayer } from '@allmaps/leaflet'

export default class extends Controller {
  static targets = [ "placeholder" ]

  connect(){

    console.log("Map Controller Connected");
    console.log(this.element);

    // Grok: Allmaps annotation for center and zoom level?
    this.map = L.map('allmaps-map', {
      center: [43.063518, -89.3906863],
      zoom: 10,
      zoomAnimationThreshold: 1
    })
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href=https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors'
    }).addTo(this.map)
    
    const annotationUrl = 'https://annotations.allmaps.org/manifests/c2f9fc8490151424'
    const warpedMapLayer = new WarpedMapLayer(annotationUrl)
      .addTo(this.map)

    const bounds = warpedMapLayer.getBounds();
      this.map.fitBounds(bounds, {
        padding
      });
  }

  disconnect(){
    this.map.remove()
  }
}