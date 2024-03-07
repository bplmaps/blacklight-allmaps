# frozen_string_literal: true

namespace :blacklight_allmaps do
  namespace :sidecars do
    namespace :harvest do
      desc "Harvest - crawl SolrDocuments to store Allmaps data locally"
      task :allmaps => [ :environment ] do
        Blacklight.default_index.connection.get('select', params: {q: '*:*', fl: 'id', rows: 100_000_000})['response']['docs'].each do |doc|
          puts "Harvesting Allmaps data for #{doc['id']}"
          Blacklight::Allmaps::StoreSidecarAnnotation.perform_later(doc['id'])
        end      
      end
    end
  end
end
