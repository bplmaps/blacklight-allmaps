# frozen_string_literal: true

require 'blacklight'

module Blacklight
  module Allmaps
    class Engine < Rails::Engine
      initializer 'blacklight-allmaps.importmap', before: 'importmap' do |app|
        app.config.assets.paths << Engine.root.join('app/javascript')
        app.config.importmap.paths << Engine.root.join('config/importmap.rb')
        app.config.importmap.cache_sweepers << Engine.root.join('app/javascript')
      end
    end
  end
end
