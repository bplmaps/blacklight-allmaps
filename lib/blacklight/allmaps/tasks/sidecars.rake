# frozen_string_literal: true

namespace :blacklight_allmaps do
  namespace :sidecars do
    namespace :harvest do
      desc "Harvest - crawl SolrDocuments to store Allmaps data locally"
      task allmaps: [:environment] do
        cursorMark = '*'
        loop do
          response = Blacklight.default_index.connection.get(
            "select", params: { 
              q: '*:*', # all docs
              fl: "id",  # just id field
              cursorMark: cursorMark, # use the cursor mark to handle paging
              rows: 1000,
              sort: "id asc" # must sort by id to use the cursor mark
          })
        
          response["response"]["docs"].each do |doc|
            puts "Harvesting Allmaps data for #{doc["id"]}"
            Blacklight::Allmaps::StoreSidecarAnnotation.perform_later(doc["id"])
          end

          break if response["nextCursorMark"] == cursorMark # this means the result set is finished
          cursorMark = response["nextCursorMark"]
        end
      end
    end
  end
end
