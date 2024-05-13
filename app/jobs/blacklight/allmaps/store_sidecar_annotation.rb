require "httparty"

module Blacklight
  module Allmaps
    class StoreSidecarAnnotation < ApplicationJob
      queue_as :default

      def perform(document_id)
        solr_document = ::SolrDocument.find(document_id)
        sidecar = solr_document.sidecar_allmaps

        if ApplicationController.helpers.georeferenceable?(solr_document)
          # Sleep for a random amount of time to crawl politely
          sleep(rand(1..5)) 

          # Store the IIIF Manifest
          response = HTTParty.get(solr_document.iiif_manifest_url, follow_redirects: true)
          if response.code == 200
            # @TODO: validate the response body is a valid IIIF Manifest
            sidecar.iiif_manifest = response.body

            # Store the Manifest ID
            # - Could be either "@id" or "id"
            sidecar.manifest_id = JSON.parse(sidecar.iiif_manifest)["@id"] || JSON.parse(sidecar.iiif_manifest)["id"]
          end

          # Store the Allmaps Annotation
          # Example:
          # https://annotations.allmaps.org/?url=https://www.digitalcommonwealth.org/search/commonwealth:4m90f9436/manifest
          # => https://annotations.allmaps.org/manifests/c2f9fc8490151424
          annotation_url_by_iiif_uri = "https://annotations.allmaps.org/?url=#{solr_document.iiif_manifest_url}"

          response = HTTParty.get(annotation_url_by_iiif_uri, follow_redirects: true)
          if response.code == 200
            # @TODO: validate the response body is a valid Allmaps Annotation
            sidecar.allmaps_annotation = response.body
            sidecar.annotated = true
          end

          sidecar.save
        end
      end
    end
  end
end
