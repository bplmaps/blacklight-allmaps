// update_georef_links.js
export const updateGeorefLinks = async () => {
  const sidebarElement = document.getElementById('allmaps-sidebar');
  if (sidebarElement) {
    const manifestUrl = sidebarElement.getAttribute('data-iiif-manifest');
    const documentId = sidebarElement.getAttribute('data-document-id');
    const georefDiv = document.getElementById('georeferencing');
    const annotationUrlByIIIFUri = `https://annotations.allmaps.org/?url=${manifestUrl}`;

    try {
      const response = await fetch(annotationUrlByIIIFUri);
      if (!response.ok) {
        georefDiv.innerHTML = `<a href="https://editor.allmaps.org/#/collection?url=${manifestUrl}" target="_blank">Georeference this item</a>`;

        const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        fetch(`/allmaps/annotations/${documentId}`, {
          method: "PUT",
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

      } else {
        const annotationUrl = response.url;
        georefDiv.innerHTML = `<a href="https://viewer.allmaps.org/?url=${annotationUrl}" target="_blank">View this georeferenced item</a>`;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
};
