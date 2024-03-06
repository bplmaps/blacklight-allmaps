# frozen_string_literal: true

require "spec_helper"

feature "GBL Catalog#show > Sidebar" do
  scenario "should render Georeferencing card" do
    visit solr_document_path "harvard-g4124-m2-1855-m3"
    expect(page).to have_css "#allmaps-sidebar", count: 1
  end
end
