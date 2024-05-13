# frozen_string_literal: true

require "rails/generators"

module Blacklight
  module Allmaps
    class BlacklightGenerator < Rails::Generators::Base
      source_root File.expand_path("templates", __dir__)

      desc <<-DESCRIPTION
        This generator makes the following changes to your application:
        1. Copies stylesheets to Blacklight app
        2. Adds Blacklight::Allmaps configuration to CatalogController
        3. Adds georeferenced facet to CatalogController
        4. Includes Blacklight::Allmaps::SolrDocument in SolrDocument
      DESCRIPTION

      def add_bl_stylesheets
        append_to_file "app/assets/stylesheets/blacklight.scss" do
          "@import 'blacklight/allmaps/base';"
        end
      end

      def add_yarn_package
        copy_file "package.json", "package.json"
        run "yarn install"
      end

      def add_configuration
        inject_into_file "app/controllers/catalog_controller.rb", after: "#config.show.thumbnail_field = 'thumbnail_path_ss'" do
          "\n
    # Blacklight::Allmaps Viewer
    config.show.partials.insert(1, :blacklight_allmaps)
    config.default_solr_unique_key = \"id\"
    config.default_georeferenced_field = \"bl_georeferenced_bsi\"
    config.default_iiif_manifest_field = \"iiif_manifest_url_ssi\""
        end
      end

      def add_bl_georeferenced_facet
        inject_into_file "app/controllers/catalog_controller.rb", after: "config.add_facet_field 'subject_era_ssim', label: 'Era'" do
          "\n    config.add_facet_field 'bl_georeferenced_bsi', label: I18n.t('allmaps.bl_facet_label')"
        end
      end

      def include_blacklight_allmaps_solrdocument
        inject_into_file "app/models/solr_document.rb", after: "include Blacklight::Solr::Document" do
          "\n include Blacklight::Allmaps::SolrDocument"
        end
      end
    end
  end
end
