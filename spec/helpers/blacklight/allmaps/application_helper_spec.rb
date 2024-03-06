# frozen_string_literal: true

require "spec_helper"
require "blacklight/allmaps/application_helper"

# @TODO: GeoBlacklight dependent
describe Blacklight::Allmaps::ApplicationHelper, type: :helper do
  let(:document) { SolrDocument.new(document_attributes) }

  describe "#georeferenceable?" do
    context "when iiif_manifest_url is present" do
      let(:document_attributes) { {dct_references_s: "{\"http://iiif.io/api/presentation#manifest\":\"https://example.com/manifest\"}" }}

      it "returns true" do
        expect(georeferenceable?(document)).to be_truthy
      end
    end

    context "when iiif_manifest_url is not present" do
      let(:document_attributes) { {dct_references_s: "{}" }}
      
      it "returns false" do
        expect(georeferenceable?(document)).to be_falsey
      end
    end
  end
end