require "rails/generators"

module Blacklight
  module Allmaps
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path("templates", __dir__)

      class_option :geoblacklight, type: :boolean, default: false, aliases: "-geo", desc: "Install with GeoBlacklight."

      desc "Install BlacklightAllmaps"

      def generate_config
        generate "blacklight:allmaps:config"
      end

      def generate_models
        generate "blacklight:allmaps:models"
      end

      def bundle_install
        Bundler.with_unbundled_env do
          run "bundle install"
        end
      end
    end
  end
end
