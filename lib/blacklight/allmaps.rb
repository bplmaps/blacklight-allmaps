require "blacklight"
require "blacklight/allmaps/version"
require "blacklight/allmaps/engine"

module Blacklight
  module Allmaps
    def self.version
      @version ||= VERSION
    end

    # returns the full path the the plugin installation
    def self.root
      @root ||= __dir__
    end
  end
end
