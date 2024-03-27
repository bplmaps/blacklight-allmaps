# frozen_string_literal: true

require "rails/generators"
require "rails/generators/migration"

module Blacklight
  module Allmaps
    class ModelsGenerator < Rails::Generators::Base
      include Rails::Generators::Migration

      source_root File.expand_path("templates", __dir__)

      desc <<-DESCRIPTION
        This generator makes the following changes to your application:
        1. Preps engine migrations
        2. Adds Sidecar ActiveRecord model
      DESCRIPTION

      # Setup the database migrations
      def copy_migrations
        rake "blacklight_allmaps_engine:install:migrations"
      end

      def include_sidecar_allmaps_solrdocument
        sidecar = <<-SIDECAR
  
  def sidecar_allmaps
    # Find or create, and set version
    sidecar = Blacklight::Allmaps::Sidecar.where(
      solr_document_id: id,
    ).first_or_create do |sc|
      sc.solr_version = self._source["_version_"]
    end

    sidecar.solr_version = self._source["_version_"]
    sidecar.save

    sidecar
  end
        SIDECAR

        inject_into_file "app/models/solr_document.rb", sidecar, before: /^end/
      end
    end
  end
end
