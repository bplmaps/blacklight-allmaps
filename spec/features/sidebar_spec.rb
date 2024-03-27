# frozen_string_literal: true

require "spec_helper"

feature "GEOBLACKLIGHT Catalog#show > Sidebar", js: true do
  scenario "Georeferencing card > Link to Allmaps Viewer" do
    skip("GBL") unless defined?(Geoblacklight)
    visit solr_document_path "harvard-g4124-m2-1855-m3"
    expect(page).to have_css "#allmaps-sidebar", count: 1
    expect(page).to have_text "View this georeferenced item"
  end

  scenario "Georeferencing card > Link to Allmaps Editor" do
    skip("GBL") unless defined?(Geoblacklight)
    visit solr_document_path "p16022coll245:868"
    expect(page).to have_css "#allmaps-sidebar", count: 1
    expect(page).to have_text "Georeference this item"
  end
end

feature "BLACKLIGHT Catalog#show > Sidebar", js: true do
  scenario "Georeferencing card > Link to Allmaps Viewer" do
    skip("GBL") if defined?(Geoblacklight)
    visit solr_document_path "89696911"
    expect(page).to have_css "#allmaps-sidebar", count: 1
    expect(page).to have_text "View this georeferenced item"
  end
end
