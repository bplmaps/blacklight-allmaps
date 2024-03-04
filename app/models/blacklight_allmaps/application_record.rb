module Blacklight
  module Allmaps
    class ApplicationRecord < ActiveRecord::Base
      self.abstract_class = true
    end
  end
end
