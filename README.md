# Blacklight::Allmaps

![CI](https://github.com/bplmaps/blacklight-allmaps/actions/workflows/ci.yml/badge.svg) 

<img alt="Allmaps Logo" src="app/assets/images/blacklight/allmaps/allmaps-logo.svg" height="16px"/>
<img alt="Blacklight Logo" src="app/assets/images/blacklight/allmaps/blacklight-logo.png" height="16px"/> 
<img alt="GeoBlackliht Logo" src="app/assets/images/blacklight/allmaps/geoblacklight-logo.png" height="16px"/>

A [Blacklight](https://projectblacklight.org/) / [GeoBlacklight](https://geoblacklight.org/) plugin for including [Allmaps](https://allmaps.org/) georeferenced maps inside your application.

### Example

![Screen shot](doc/screenshot_layers.png)

## Usage
How to use my plugin.

## Installation
Add this line to your application's Gemfile:

```ruby
gem "blacklight_allmaps"
```

And then execute:
```bash
bundle
```

For BLACKLIGHT run the install generator:

```bash
bundle exec rake blacklight:allmaps:install
```

For GEOBLACKLIGHT run the install generator like so: 

```bash
LIGHT=geoblacklight bundle exec rake blacklight:allmaps:install
```

## Rake Tasks

rake blacklight_allmaps:sidecars:harvest:allmaps

rake blacklight_allmaps:index:gbl_georeferenced_facet

## ActiveRecord Objects — Blacklight::Allmaps::Sidecar 

Blacklight::Allmaps adopts the "sidecar" pattern from Spotlight, adding an ActiveRecord object to the database for each SolrDocument object in the index.

The Blacklight::Allmaps::Sidecar object contains:

* id: primary key
* solr_document_id: solr document primary key
* document_type SolrDocument
* manifest_id: IIIF Manifest ID
* annotated: boolean (true|false)
* allmaps_id: Allmaps ID
* iiif_manifest: Copy of the IIIF Manifest
* allmaps_annotation: Copy of the Allmaps IIIF Annotation
* solr_version: solr document version number
* created_at: created at
* updated_at: updated at

```irb
#<Blacklight::Allmaps::Sidecar:0x0000000141991a50
 id: 1,
 solr_document_id: "harvard-g4124-m2-1855-m3",
 document_type: "SolrDocument",
 manifest_id: "https://ark.digitalcommonwealth.org/ark:/50959/4m90f9436/manifest",
 annotated: true,
 allmaps_id: "c2f9fc8490151424",
 iiif_manifest:
  "{\"@context\":\"http://iiif.io/api/presentation/2/context.json\",\"@id\":\"https://ark.digitalcommonwealth.org/ark:/50959/4m90f9436/manifest\",\"@type\":\"sc:Manifest\",\"label\":\"Map of Madison and the Four Lake Country, Dane Co. Wis\" ...
 allmaps_annotation:
  "{\n  \"type\": \"AnnotationPage\",\n  \"@context\": \"http://www.w3.org/ns/anno.jsonld\",\n  \"items\": [\n    {\n      \"id\": \"https://annotations.allmaps.org/maps/3740c2822f443181\",\n      \"type\": \"Annotation\",\n      \"@context\": [\n        \"http://iiif.io/api/extension/georef/1/context.json\" ...
 solr_version: 1794605692067250176,
 created_at: Tue, 26 Mar 2024 15:47:49.422826000 UTC +00:00,
 updated_at: Tue, 26 Mar 2024 16:39:42.427682000 UTC +00:00>
```

## Contributing
Contribution directions go here.

## License
The gem is available as open source under the terms of the [Apache 2.0 License](https://opensource.org/license/apache-2-0).
