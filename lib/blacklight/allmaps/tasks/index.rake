# frozen_string_literal: true

require "blacklight"

namespace :blacklight_allmaps do
  namespace :index do
    desc "Index - add BL Allmaps fixture data to GBL solr"
    task :gbl_fixtures do
      docs = Dir["spec/fixtures/solr_documents/*.json"].map { |f| JSON.parse File.read(f) }.flatten
      Blacklight.default_index.connection.add docs
      Blacklight.default_index.connection.commit
    end

    desc "Index - add Allmaps facet data to GBL solr"
    task gbl_georeferenced_facet: [:environment] do
      # @TODO: Optimize to work in "batches".
      # Ex. https://github.com/projectblacklight/blacklight/wiki/Search-engine-harvesting
      # See use of nextCursorMark above

      # Steps
      # 1. Get all the documents from Solr
      # 2. Determine which documents have georeferenced data
      # 3. Clean JSON for re-indexing
      # 4. Add gbl_georeferenced_b values
      # 5. Re-index the georeferenced documents

      # 1. Get all the documents from Solr
      Blacklight.default_index.connection.get(
        "select",
        params: {
          q: "*:*", fl: "*", rows: 100_000_000
        }
      )["response"]["docs"].each do |doc|
        # 2. Determine which documents have georeferenced data
        solr_document = SolrDocument.find(doc["id"])
        if solr_document.sidecar.present? && solr_document.sidecar.annotated?

          # 3. Clean JSON for re-indexing
          keys_for_deletion = %w[
            _version_
            timestamp
            solr_bboxtype
            solr_bboxtype__minX
            solr_bboxtype__minY
            solr_bboxtype__maxX
            solr_bboxtype__maxY
          ]

          cleaned_doc = doc.except!(*keys_for_deletion)

          # 4. Add gbl_georeferenced_b value
          # @TODO: add allmaps_id
          cleaned_doc["gbl_georeferenced_b"] = true

          # 5. Re-index the georeferenced documents
          Blacklight.default_index.connection.add cleaned_doc
        end
      end
      Blacklight.default_index.connection.commit
    end
  end
end
