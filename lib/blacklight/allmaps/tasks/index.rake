# frozen_string_literal: true

require "blacklight"

namespace :blacklight_allmaps do
  namespace :index do
    desc "Index - add BL Allmaps fixture data to solr"
    task :gbl_fixtures do
      docs = Dir["spec/fixtures/solr_documents/*.json"].map { |f| JSON.parse File.read(f) }.flatten
      Blacklight.default_index.connection.add docs
      Blacklight.default_index.connection.commit
    end
  end
end
