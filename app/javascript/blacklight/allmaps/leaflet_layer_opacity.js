// leaflet_layer_opacity.js
import L from 'leaflet';

class LayerOpacityControl extends L.Control {
  initialize(layer) {
    super.initialize();
    let options = { position: 'topleft' };

    // Check if the layer is actually a layer group and adjust accordingly
    if (typeof layer.getLayers !== 'undefined') {
      options.layer = layer.getLayers()[0];
    } else {
      options.layer = layer;
    }

    L.Util.setOptions(this, options);
  }

  onAdd(map) {
    const container = L.DomUtil.create('div', 'opacity-control unselectable');
    const controlArea = L.DomUtil.create('div', 'opacity-area', container);
    const handle = L.DomUtil.create('div', 'opacity-handle', container);
    const handleArrowUp = L.DomUtil.create('div', 'opacity-arrow-up', handle);
    const handleText = L.DomUtil.create('div', 'opacity-text', handle);
    const handleArrowDown = L.DomUtil.create('div', 'opacity-arrow-down', handle);
    const bottom = L.DomUtil.create('div', 'opacity-bottom', container);

    L.DomEvent.stopPropagation(container);
    L.DomEvent.disableClickPropagation(container);

    this.setListeners(handle, bottom, handleText);
    handle.style.top = `${handle.offsetTop - 13 + 50}px`;
    handleText.innerHTML = `${parseInt(this.options.layer.options.opacity * 100, 10)}%`;

    return container;
  }

  setListeners(handle, bottom, handleText) {
    let start = false;
    let startTop;

    L.DomEvent.on(document, 'mousemove', (e) => {
      if (!start) return;
      const percentInverse = Math.max(0, Math.min(200, startTop + parseInt(e.clientY, 10) - start)) / 2;
      handle.style.top = `${(percentInverse * 2) - 13}px`;
      handleText.innerHTML = `${Math.round((1 - (percentInverse / 100)) * 100)}%`;
      bottom.style.height = `${Math.max(0, ((100 - percentInverse) * 2) - 13)}px`;
      bottom.style.top = `${Math.min(200, (percentInverse * 2) + 13)}px`;
      this.options.layer.setOpacity(1 - (percentInverse / 100));
    });

    L.DomEvent.on(handle, 'mousedown', (e) => {
      start = parseInt(e.clientY, 10);
      startTop = handle.offsetTop - 12;
      return false;
    });

    L.DomEvent.on(document, 'mouseup', () => {
      start = null;
    });
  }
}

// Extend Leaflet's control factory to include this new control
L.Control.layerOpacity = function(layer, options) {
  return new LayerOpacityControl(layer, options);
};

export default LayerOpacityControl;
