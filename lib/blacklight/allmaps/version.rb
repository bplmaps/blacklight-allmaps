module Blacklight
  module Allmaps
    VERSION = "0.4.0"

    def self.version
      @version ||= VERSION
    end

    # returns the full path the the plugin installation
    def self.root
      @root ||= File.expand_path(File.dirname(__FILE__, 4))
    end
  end
end
