FactoryBot.define do
  factory :annotation, class: 'Blacklight::Allmaps::Sidecar' do
    solr_document_id { "abc_#{rand(1000)}" }
    document_type { 'SolrDocument' }
    manifest_id { "http://example.com/manifest/#{rand(1000)}" }
    annotated { true }
    allmaps_id { Digest::SHA1.hexdigest(manifest_id)[0..15]}
    iiif_manifest { "http://example.com/iiif/#{rand(1000)}" }
    allmaps_annotation { "http://example.com/annotation/#{rand(1000)}" }
    solr_version { 1 }
  end
end
