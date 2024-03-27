# frozen_string_literal: true

require "spec_helper"

describe Blacklight::Allmaps::Sidecar do
  let(:document) { SolrDocument.new(document_attributes) }

  describe "#sidecar_allmaps" do
    let(:document_attributes) {}

    it "responds to attribute methods" do
      expect(document.sidecar_allmaps).to respond_to :solr_document_id
      expect(document.sidecar_allmaps).to respond_to :document_type
      expect(document.sidecar_allmaps).to respond_to :manifest_id
      expect(document.sidecar_allmaps).to respond_to :annotated
      expect(document.sidecar_allmaps).to respond_to :allmaps_id
      expect(document.sidecar_allmaps).to respond_to :iiif_manifest
      expect(document.sidecar_allmaps).to respond_to :allmaps_annotation
      expect(document.sidecar_allmaps).to respond_to :solr_version
    end
  end
end
