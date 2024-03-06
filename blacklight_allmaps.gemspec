require_relative "lib/blacklight/allmaps/version"

Gem::Specification.new do |spec|
  spec.name = "blacklight_allmaps"
  spec.version = Blacklight::Allmaps::VERSION
  spec.platform = Gem::Platform::RUBY
  spec.authors = ["Eric Larson"]
  spec.email = ["ewlarson@gmail.com"]
  spec.homepage = "https://github.com/bplmaps/blacklight-allmaps"
  spec.summary = "Blacklight Allmaps plugin"
  spec.description = "Description of BlacklightAllmaps"
  spec.license = "Apache 2.0"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage

  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    Dir["{app,config,db,lib}/**/*", "LICENSE", "Rakefile", "README.md"]
  end

  spec.add_dependency "blacklight", ">= 7.25.2", "< 9"
  spec.add_dependency "geoblacklight", "4.1"

  spec.add_development_dependency "solr_wrapper"
  spec.add_development_dependency "rails-controller-testing"
  spec.add_development_dependency "rspec-rails"
  spec.add_development_dependency "engine_cart", "~> 2.1"
  spec.add_development_dependency "capybara", "~> 3"
  spec.add_development_dependency "webdrivers"
  spec.add_development_dependency "standard", "~> 1.34"
  spec.add_development_dependency "sqlite3"
end
