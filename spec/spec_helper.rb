# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"

require "action_cable/engine"
require "engine_cart"
EngineCart.load_application!

require "rails-controller-testing" if Rails::VERSION::MAJOR >= 5
require "rspec/rails"
require "capybara/rspec"
require "webdrivers"

Capybara.register_driver :headless_chrome do |app|
  Capybara::Selenium::Driver.load_selenium
  browser_options = ::Selenium::WebDriver::Chrome::Options.new.tap do |opts|
    opts.args << "--headless"
    opts.args << "--disable-gpu"
    opts.args << "--no-sandbox"
    opts.args << "--window-size=1280,1696"
  end
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: browser_options)
end

Capybara.javascript_driver = :headless_chrome

require "blacklight/allmaps"

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Pathname.new(File.expand_path("support/**/*.rb", __dir__))].sort.each { |f| require f }

RSpec.configure do |config|
  # rspec-rails 3 will no longer automatically infer an example group's spec type
  # from the file location. You can explicitly opt-in to the feature using this
  # config option.
  # To explicitly tag specs without using automatic inference, set the `:type`
  # metadata manually:
  #
  #     describe ThingsController, :type => :controller do
  #       # Equivalent to being in spec/controllers
  #     end
  config.infer_spec_type_from_file_location!

  config.include Devise::Test::ControllerHelpers, type: :controller
end
