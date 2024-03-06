require "rake"
require "bundler"
Bundler::GemHelper.install_tasks

require "bundler/gem_tasks"

require "rspec/core/rake_task"
require "engine_cart/rake_task"
require "solr_wrapper"
require "blacklight/allmaps/rake_task"

task default: :ci

desc "Run specs"
RSpec::Core::RakeTask.new

task ci: ["engine_cart:generate"] do
  system "rake blacklight_allmaps:seed"
  Rake::Task["spec"].invoke
end

namespace :blacklight_allmaps do
  desc "Put sample data into solr"
  task seed: ["engine_cart:generate"] do
    within_test_app do
      ENV["RAILS_ENV"] ||= "test"

      # Seed Blacklight data
      # system "rake blacklight:index:seed"

      # Seed GeoBlacklight data
      # system "rake geoblacklight:index:seed[:remote]"

      # Seed Blacklight Allmaps GBL data
      system "rake blacklight_allmaps:index:gbl_fixtures"
    end
  end

  desc "Run Solr and Blacklight for interactive development"
  task :server, [:rails_server_args] do |_t, args|
    if File.exist? EngineCart.destination
      within_test_app do
        system "bundle update"
      end
    else
      Rake::Task["engine_cart:generate"].invoke
    end

    SolrWrapper.wrap(port: "8983") do |solr|
      solr.with_collection(name: "blacklight-core", dir: File.join(__dir__, "solr", "conf")) do
        Rake::Task["blacklight_allmaps:seed"].invoke

        within_test_app do
          system "bundle exec rails s #{args[:rails_server_args]}"
        end
      end
    end
  end


  desc "Run Solr and seed with sample data"
  task :solr do
    if File.exist? EngineCart.destination
      within_test_app do
        system "bundle update"
      end
    else
      Rake::Task["engine_cart:generate"].invoke
    end

    SolrWrapper.wrap(port: "8983") do |solr|
      solr.with_collection(name: "blacklight-core", dir: File.join(File.expand_path(".", File.dirname(__FILE__)), "solr", "conf")) do
        system "rake blacklight_allmaps:seed"

        within_test_app do
          puts "\nSolr server running: http://localhost:#{solr.port}/solr/#/blacklight-core"
          puts "\n^C to stop"
          puts " "
          begin
            sleep
          rescue Interrupt
            puts "Shutting down..."
          end
        end
      end
    end
  end
end
