# frozen_string_literal: true

require "rails/generators"

class TestAppGenerator < Rails::Generators::Base
  source_root "./spec/test_app_templates"

  # if you need to generate any additional configuration
  # into the test app, this generator will be run immediately
  # after setting up the application

  def add_gems
    if ENV["BLACKLIGHT_VERSION"] == "8.1.0"
      gem "blacklight", "8.1.0"
    else
      gem "blacklight", "~> 7.0"
    end

    if ENV["LIGHT"] == "geoblacklight"
      gem "geoblacklight", "4.1"
    end

    Bundler.with_unbundled_env do
      run "bundle install"
    end
  end

  def run_blacklight_generator
    say_status("warning", "GENERATING BLACKLIGHT", :yellow)
    generate "blacklight:install", "--devise"
  end

  def run_geoblacklight_generator
    return unless ENV["LIGHT"] == "geoblacklight"
    say_status("warning", "GENERATING GEOBLACKLIGHT", :yellow)
    generate "geoblacklight:install", "--force"
  end

  def run_geoblacklight_admin_generator
    say_status("warning", "GENERATING BLACKLIGHT ALLMAPS", :yellow)
    generate "blacklight:allmaps:install", "--force"
  end

  # Symlink fixture document directories so the test app doesn't have to be
  # regenerated when they are changed or updated.
  def fixtures
    solr_docs_path = Rails.root.join("..", "spec", "fixtures", "solr_documents")
    FileUtils.mkdir_p "spec/fixtures"
    FileUtils.symlink solr_docs_path, "spec/fixtures/solr_documents"
  end
end
