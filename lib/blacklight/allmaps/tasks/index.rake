# frozen_string_literal: true

require "blacklight"

namespace :blacklight_allmaps do
  namespace :index do
    desc "Index - add Allmaps fixture data to Blacklight solr"
    task :bl_fixtures do
      docs = Dir["#{Blacklight::Allmaps.root}/spec/fixtures/solr_documents/blacklight/bl_*.json"].map { |f| JSON.parse File.read(f) }.flatten
      Blacklight.default_index.connection.add docs
      Blacklight.default_index.connection.commit
    end

    desc "Index - add Allmaps fixture data to GeoBlacklight solr"
    task :gbl_fixtures do
      docs = Dir["#{Blacklight::Allmaps.root}/spec/fixtures/solr_documents/geoblacklight/gbl_*.json"].map { |f| JSON.parse File.read(f) }.flatten
      Blacklight.default_index.connection.add docs
      Blacklight.default_index.connection.commit
    end

    desc "Index - add Allmaps facet data to GeoBlacklight solr"
    task gbl_georeferenced_facet: [:environment] do
      # Steps
      # 1. Use cursor to paginate all documents in Solr
      # 2. Determine which documents have georeferenced data
      # 3. Clean JSON for re-indexing
      # 4. Add gbl_georeferenced_b values
      # 5. Re-index the georeferenced documents

      # 1. Get all the documents from Solr
      cursor_mark = "*"
      loop do
        response = Blacklight.default_index.connection.get(
          "select", params: {
            q: "*:*", # all docs
            fl: "*",  # all fields
            cursorMark: cursor_mark, # use the cursor mark to handle paging
            rows: 1000,
            sort: "id asc" # must sort by id to use the cursor mark
          }
        )

        response["response"]["docs"].each do |doc|
          # 2. Determine which documents have georeferenced data
          solr_document = SolrDocument.find(doc["id"])
          if solr_document.sidecar_allmaps.present? && solr_document.sidecar_allmaps.annotated?

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
            # @TODO: add allmaps_id?
            cleaned_doc["gbl_georeferenced_b"] = true

            # 5. Re-index the georeferenced documents
            Blacklight.default_index.connection.add cleaned_doc
          end
        end

        break if response["nextCursorMark"] == cursor_mark # this means the result set is finished
        cursor_mark = response["nextCursorMark"]
      end
      Blacklight.default_index.connection.commit
    end

    desc "Index - add Allmaps facet data to Blacklight solr"
    task bl_georeferenced_facet: [:environment] do
      # Steps
      # 1. Use cursor to paginate all documents in Solr
      # 2. Determine which documents have georeferenced data
      # 3. Clean JSON for re-indexing
      # 4. Add bl_georeferenced_bsi values
      # 5. Re-index the georeferenced documents

      # 1. Get all the documents from Solr
      cursor_mark = "*"
      loop do
        response = Blacklight.default_index.connection.get(
          "select", params: {
            q: "*:*", # all docs
            fl: "*",  # all fields
            cursorMark: cursor_mark, # use the cursor mark to handle paging
            rows: 1000,
            sort: "id asc" # must sort by id to use the cursor mark
          }
        )

        response["response"]["docs"].each do |doc|
          # 2. Determine which documents have georeferenced data
          solr_document = SolrDocument.find(doc["id"])
          if solr_document.sidecar_allmaps.present? && solr_document.sidecar_allmaps.annotated?

            # 3. Clean JSON for re-indexing
            keys_for_deletion = %w[
              _version_
              timestamp
            ]

            cleaned_doc = doc.except!(*keys_for_deletion)

            # 4. Add gbl_georeferenced_b value
            # @TODO: add allmaps_id?
            cleaned_doc["bl_georeferenced_bsi"] = true

            # 5. Re-index the georeferenced documents
            Blacklight.default_index.connection.add cleaned_doc
          end
        end

        break if response["nextCursorMark"] == cursor_mark # this means the result set is finished
        cursor_mark = response["nextCursorMark"]
      end
      Blacklight.default_index.connection.commit
    end
  end
end
