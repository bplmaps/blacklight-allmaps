# frozen_string_literal: true

require "spec_helper"

feature "GEOBLACKLIGHT Catalog#show > Tabbed View", js: true do
  fixtures :blacklight_allmaps_sidecars

  scenario "Allmaps Georeferenced: Should have tabs for item and map view" do
    skip("GBL") unless defined?(Geoblacklight)
    visit solr_document_path "harvard-g4124-m2-1855-m3"
    expect(page).to have_css "#item-viewer", count: 1
    expect(page).to have_css "#georeferenced-viewer", count: 1
    expect(page).to have_text "Item Viewer"
    expect(page).to have_text "Georeferenced Map"

    click_on "Georeferenced Map"

    # See Allmaps Overlay
    expect(page).to have_css "#allmaps-map", count: 1

    # See Zoom, Opacity, and Fullscreen Controls
    within(".leaflet-control-container", visible: false) do
      expect(page).to have_css ".leaflet-control-zoom", count: 1, visible: false
      expect(page).to have_css ".opacity-control", count: 1, visible: false
      expect(page).to have_css ".leaflet-control-fullscreen", count: 1, visible: false
    end
  end

  scenario "Allmaps NOT Georeferenced: Should only have tab item view" do
    skip("GBL") unless defined?(Geoblacklight)
    visit solr_document_path "p16022coll245:868"
    expect(page).to have_css "#item-viewer", count: 1
    expect(page).to have_no_css "#georeferenced-viewer"
    expect(page).to have_text "Item Viewer"
    expect(page).to have_no_text "Georeferenced Map"
  end
end
