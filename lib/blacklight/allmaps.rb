# frozen_string_literal: true

require "blacklight/allmaps/version"

module Blacklight
  module Allmaps
    require "blacklight/allmaps/engine"

    def self.root
      @root ||= File.expand_path(File.dirname(File.dirname(__FILE__)))
    end
  end
end
