# frozen_string_literal: true

##
# ActiveRecord appendage for SolrDocuments
module Blacklight
  module Allmaps
    class Sidecar < ApplicationRecord
      self.table_name = "blacklight_allmaps_sidecars"

      def solr_document
        document_type.constantize.find(solr_document_id)
      end
    end
  end
end
