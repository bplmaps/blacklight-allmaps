# frozen_string_literal: true

namespace :blacklight_allmaps do
  namespace :sidecars do
    namespace :harvest do
      desc "Sidecars - Harvest: Crawl SolrDocuments to store Allmaps data locally"
      task allmaps: [:environment] do
        cursor_mark = "*"
        loop do
          response = Blacklight.default_index.connection.get(
            "select", params: {
              q: "*:*", # all docs
              fl: "id",  # just id field
              cursorMark: cursor_mark, # use the cursor mark to handle paging
              rows: 1000,
              sort: "id asc" # must sort by id to use the cursor mark
            }
          )

          response["response"]["docs"].each do |doc|
            puts "Harvesting Allmaps data for #{doc["id"]}"
            Blacklight::Allmaps::StoreSidecarAnnotation.perform_later(doc["id"])
          end

          break if response["nextCursorMark"] == cursor_mark # this means the result set is finished
          cursor_mark = response["nextCursorMark"]
        end
      end
    end

    desc "Sidecars - Purage all: Destroy all harvested images and sidecar AR objects"
    task purge_all: [:environment] do
      Blacklight::Allmaps::Sidecar.destroy_all
    end

    desc "Sidecars - Purge orphans: Destroy orphaned sidecar Active Record objects"
    # When a Sidecar object exists,
    # but it's corresponding SolrDocument is no longer in the Solr index.
    task purge_orphans: [:environment] do
      # Remove all sidecars that have no corresponding SolrDocument
      sidecars = Blacklight::Allmaps::Sidecar.all
      sidecars.each do |sc|
        Geoblacklight::SolrDocument.find(sc.document_id)
      rescue
        sc.destroy
        puts "orphaned / #{sc.document_id} / destroyed"
      end
    end
  end
end
