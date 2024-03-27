module Blacklight
  module Allmaps
    module ApplicationHelper
      # @TODO: Document how to customize this helper
      def georeferenceable?(document = @document)
        # A IIIF Manifest is required for georeferencing
        # However, additional checks might be warranted

        # GeoBlacklight
        document.iiif_manifest_url ? true : false
      rescue
        # Blacklight
        document["iiif_manifest_url_ssi"] ? true : false
      end
    end
  end
end
