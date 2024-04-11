# frozen_string_literal: true

require "rails/generators"

module Blacklight
  module Allmaps
    class ConfigGenerator < Rails::Generators::Base
      source_root File.expand_path("templates", __dir__)

      desc <<-DESCRIPTION
        This generator makes the following changes to your application:
        1. Copies config files to host config
      DESCRIPTION

      def asset_config_manifest
        copy_file "manifest.js", "app/assets/config/manifest.js", force: true
      end

      def add_assets_initialier
        append_to_file "config/initializers/assets.rb" do
          "
          # Blacklight Allmaps
          Rails.application.config.assets.precompile += %w( blacklight/allmaps/allmaps-logo.svg )"
        end
      end

      def copy_rake_tasks
        append_to_file "Rakefile", "require 'blacklight/allmaps/rake_task'\n"
      end

      def prioritize_blacklight_allmaps_views
        inject_into_file "config/application.rb", "\nrequire \"blacklight/allmaps/engine\"\n", before: "# Require the gems listed in Gemfile"
        inject_into_file "config/application.rb", "\n    config.railties_order = [Blacklight::Allmaps::Engine, :main_app, :all]\n", after: "class Application < Rails::Application\n"
      end

      def add_importmap_pins
        append_to_file "config/importmap.rb" do
          <<~CONTENT
            pin "leaflet" # @1.9.4
            pin '@allmaps/leaflet', to: "@allmaps--leaflet.js"
          CONTENT
        end
      end

      def set_active_job_config
        inject_into_file "config/environments/development.rb", "  config.active_job.queue_adapter = :inline\n", after: "Rails.application.configure do\n"
      end

      def add_geoblacklight
        return unless ENV["LIGHT"] == "geoblacklight"
        append_to_file "Gemfile", '"geoblacklight", "~> 4.4"'
      end

      def include_blacklight_allmaps_solrdocument
        return unless ENV["LIGHT"] == "blacklight"
        inject_into_file "app/models/solr_document.rb", after: "include Blacklight::Solr::Document" do
          "\n include Blacklight::Allmaps::SolrDocument"
        end
      end

      def add_gbl_tabbed_viewer
        return unless ENV["LIGHT"] == "geoblacklight"
        # Use the tabbed viewer
        inject_into_file "app/controllers/catalog_controller.rb", after: "config.show.partials << \"show_default_viewer_container\"" do
          "\n
    # Blacklight::Allmaps Tabbed Viewer
    config.show.partials << \"show_allmaps_tabbed_viewer_container\""
        end

        # Remove the default viewer
        gsub_file("app/controllers/catalog_controller.rb", "config.show.partials << \"show_default_viewer_container\"", "#config.show.partials << \"show_default_viewer_container\"")
      end

      def add_bl_allmaps_viewer
        return unless ENV["LIGHT"] == "blacklight"
        # Use the allmaps viewer
        inject_into_file "app/controllers/catalog_controller.rb", after: "#config.show.thumbnail_field = 'thumbnail_path_ss'" do
          "\n
    # Blacklight::Allmaps Viewer
    config.show.partials.insert(1, :blacklight_allmaps)"
        end
      end

      def add_bl_georeferenced_facet
        return unless ENV["LIGHT"] == "blacklight"
        inject_into_file "app/controllers/catalog_controller.rb", after: "config.add_facet_field 'subject_era_ssim', label: 'Era'" do
          "\n    config.add_facet_field 'bl_georeferenced_bsi', label: 'Allmaps Georeferenced'"
        end
      end
    end
  end
end
