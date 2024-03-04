require "rails/generators"

module Blacklight
  module Allmaps
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path("templates", __dir__)

      desc "Install BlacklightAllmaps"

      def bundle_install
        Bundler.with_unbundled_env do
          run "bundle install"
        end
      end

      def seed_data
        run "rake \"geoblacklight:index:seed[:remote]\""
      end

      def asset_config_manifest
        copy_file "manifest.js", "app/assets/config/manifest.js"
      end
    end
  end
end
