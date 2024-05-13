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
          Rails.application.config.assets.paths << Rails.root.join('node_modules')
          Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'images')
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
            pin "leaflet", to: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js", preload: true
            pin "leaflet-fullscreen", to: "https://cdn.jsdelivr.net/npm/leaflet-fullscreen@1.0.2/dist/Leaflet.fullscreen.min.js", preload: true
            pin "@allmaps/leaflet", to: "https://cdn.jsdelivr.net/npm/@allmaps/leaflet/dist/bundled/allmaps-leaflet-1.9.umd.js", preload: true
            pin_all_from File.expand_path("../app/javascript/blacklight/allmaps", __dir__), under: "blacklight-allmaps"
          CONTENT
        end
      end

      def add_javascript
        inject_into_file "app/assets/javascripts/application.js", after: "//= require blacklight/blacklight" do
          "\n
    // Required by Blacklight::Allmaps
    //= require blacklight-allmaps/app/assets/javascripts/blacklight/allmaps/blacklight-allmaps.js"
        end
      end

      def add_yarn_package
        run "yarn add blacklight-allmaps"
      end

      def set_routes
        inject_into_file "config/routes.rb", "mount Blacklight::Allmaps::Engine => '/'\n", before: /^end/
      end

      def set_active_job_config
        inject_into_file "config/environments/development.rb", "  config.active_job.queue_adapter = :inline\n", after: "Rails.application.configure do\n"
      end
    end
  end
end
