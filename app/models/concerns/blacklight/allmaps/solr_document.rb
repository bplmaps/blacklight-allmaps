# frozen_string_literal: true

# Extends Blacklight::Solr::Document for Blacklight::Allmaps specific functionality
module Blacklight
  module Allmaps
    module SolrDocument
      # Blacklight
      def iiif_manifest_url
        self[CatalogController.blacklight_config.default_iiif_manifest_field]
      end
    end
  end
end
