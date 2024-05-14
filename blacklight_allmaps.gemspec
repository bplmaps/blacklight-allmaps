lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "blacklight/allmaps/version"

Gem::Specification.new do |spec|
  spec.name = "blacklight_allmaps"
  spec.version = Blacklight::Allmaps::VERSION
  spec.platform = Gem::Platform::RUBY
  spec.authors = ["Eric Larson"]
  spec.email = ["ewlarson@gmail.com"]
  spec.homepage = "https://github.com/bplmaps/blacklight-allmaps"
  spec.summary = "Blacklight::Allmaps plugin"
  spec.description = "Description of Blacklight::Allmaps"
  spec.license = "Apache 2.0"

  spec.files = `git ls-files -z`.split("\x0")
  spec.require_paths = ["lib"]

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage

  spec.add_dependency "blacklight", ">= 7.25.2", "< 9"
  spec.add_dependency "httparty", "~> 0.20"

  spec.add_development_dependency "solr_wrapper"
  spec.add_development_dependency "rails-controller-testing"
  spec.add_development_dependency "rspec-rails"
  spec.add_development_dependency "engine_cart", "~> 2.1"
  spec.add_development_dependency "factory_bot_rails"
  spec.add_development_dependency "capybara", "~> 3"
  spec.add_development_dependency "webdrivers"
  spec.add_development_dependency "standard", "~> 1.34"
  spec.add_development_dependency "sqlite3"
end
