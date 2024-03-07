# frozen_string_literal: true

##
# ActiveRecord appendage for SolrDocuments
module Blacklight
  module Allmaps
    class Sidecar < ApplicationRecord
      self.table_name = "blacklight_allmaps_sidecars"

      before_save :set_allmaps_id

      def solr_document
        document_type.constantize.find(solr_document_id)
      end

      def set_allmaps_id
        self.allmaps_id = Digest::SHA1.hexdigest(manifest_id)[0..16] if manifest_id.present?
      end
    end
  end
end
