# frozen_string_literal: true

# Extends Blacklight::Solr::Document for Blacklight::Allmaps specific functionality
module Blacklight
  module Allmaps
    module SolrDocument
      # @TODO: Make this field configurable
      def iiif_manifest_url
        self['iiif_manifest_url_ssi']
      end
    end
  end
end
