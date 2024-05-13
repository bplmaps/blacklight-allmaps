# frozen_string_literal: true

require "rails/generators"

module Blacklight
  module Allmaps
    class GeoblacklightGenerator < Rails::Generators::Base
      source_root File.expand_path("templates", __dir__)

      desc <<-DESCRIPTION
        This generator makes the following changes to your application:
        1. Adds stylesheets to application.scss
        2. Adds GeoBlacklight to Gemfile
        3. Adds Blacklight::Allmaps configuration to CatalogController
        4. Adds Blacklight::Allmaps Tabbed Viewer to CatalogController
      DESCRIPTION

      def add_gbl_stylesheets
        append_to_file "app/assets/stylesheets/application.scss" do
          "@import 'blacklight/allmaps/base';"
        end
      end

      def add_geoblacklight
        gemfile_path = "Gemfile"

        # Check if the 'geoblacklight' gem is already included in the Gemfile
        if File.read(gemfile_path).include?("geoblacklight")
          say_status("skipped", "geoblacklight gem already included in the Gemfile", :yellow)
        else
          append_to_file "Gemfile" do
            "\ngem \"geoblacklight\", \"~> 4.4\""
          end
        end
      end

      def add_configuration
        inject_into_file "app/controllers/catalog_controller.rb", after: "config.raw_endpoint.enabled = true" do
          "\n
    # Blacklight::Allmaps Viewer
    config.default_solr_unique_key = \"id\"
    config.default_georeferenced_field = \"gbl_georeferenced_b\""
        end
      end

      def add_gbl_tabbed_viewer
        # Use the tabbed viewer
        inject_into_file "app/controllers/catalog_controller.rb", after: "config.show.partials << \"show_default_viewer_container\"" do
          "\n
    # Blacklight::Allmaps Tabbed Viewer
    config.show.partials << \"show_allmaps_tabbed_viewer_container\""
        end

        # Remove the default viewer
        gsub_file("app/controllers/catalog_controller.rb", "config.show.partials << \"show_default_viewer_container\"", "#config.show.partials << \"show_default_viewer_container\"")
      end
    end
  end
end
