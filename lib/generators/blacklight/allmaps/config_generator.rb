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

      def copy_rake_tasks
        append_to_file "Rakefile", "require 'blacklight/allmaps/rake_task'\n"
      end

      def prioritize_blacklight_allmaps_views
        inject_into_file "config/application.rb", "\nrequire \"blacklight/allmaps/engine\"\n", after: "require \"action_cable/engine\""
        inject_into_file "config/application.rb", "\nconfig.railties_order = [Blacklight::Allmaps::Engine, :main_app, :all]\n", after: "class Application < Rails::Application\n"
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
        return unless options[:geoblacklight]
        append_to_file "Gemfile", '"geoblacklight", "4.1"'
      end
    end
  end
end
