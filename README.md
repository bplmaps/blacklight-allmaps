# Blacklight::Allmaps

![CI](https://github.com/bplmaps/blacklight-allmaps/actions/workflows/ci.yml/badge.svg) 
[![Gem Version](https://img.shields.io/gem/v/blacklight_allmaps.svg)](https://github.com/bplmaps/blacklight-allmaps/releases)

<img alt="Allmaps Logo" src="app/assets/images/blacklight/allmaps/allmaps-logo.svg" height="40px"/> <img alt="Blacklight Logo" src="app/assets/images/blacklight/allmaps/blacklight-logo.png" height="40px"/> <img alt="GeoBlacklight Logo" src="app/assets/images/blacklight/allmaps/geoblacklight-logo.png" height="40px"/>

A [Blacklight](https://projectblacklight.org/) / [GeoBlacklight](https://geoblacklight.org/) plugin for including [Allmaps](https://allmaps.org/) georeferenced maps inside your application.

![Screen shot](doc/screenshot_layers.png)

## Dependencies

* Blacklight v7 (v8 forthcoming)
* GeoBlacklight v4.4+

## Installation
Add this line to your application's Gemfile:

```ruby
gem "blacklight_allmaps"
```

And then execute:
```bash
bundle
```

Run the install generator:

```bash
# For Blacklight...
LIGHT=blacklight bundle exec rails generate blacklight:allmaps:install

# For GeoBlacklight
LIGHT=geoblacklight bundle exec rails generate blacklight:allmaps:install
```

## CatalogController Configuration

Configure options for local use are set into the `catalog_controller.rb` file. 

### Blacklight

```ruby
    # Blacklight::Allmaps Viewer
    config.show.partials.insert(1, :blacklight_allmaps)
    config.default_solr_unique_key = "id"
    config.default_georeferenced_field = "bl_georeferenced_bsi"
    config.default_iiif_manifest_field = "iiif_manifest_url_ssi"
```

### GeoBlacklight
```ruby
    # Blacklight::Allmaps Viewer
    config.default_solr_unique_key = "id"
    config.default_georeferenced_field = "gbl_georeferenced_b"
```

## Rake Tasks

### Seed Fixtures

To populate Solr with some example data, you can run these tasks

```bash
# For Blacklight...
LIGHT=blacklight rake blacklight_allmaps:index:bl_fixtures

# For GeoBlacklight...
LIGHT=geoblacklight rake blacklight_allmaps:index:gbl_fixtures
```

### Harvest Allmaps IIIF Annotation Data

We harvest and store Allmaps IIIF Annotation data locally — see the Blacklight::Allmaps::Sidecar section below.

The rake task here kicks off a background harvest process that walks through your Solr index documents (using CursorMark) and checks each document for `georeferenceable?` - the presence of a IIIF Manifest. If the document is indeed georeferenceable? (true) we ping the Allmaps API to determine if the map/item has already been georeferenced in Allmaps.

```bash
# For Blacklight or GeoBlacklight
rake blacklight_allmaps:sidecars:harvest:allmaps
```

Alternatively, you can harvest Allmaps data for a list of identifers

```bash
# For Blacklight or GeoBlacklight
rake "blacklight_allmaps:sidecars:harvest_ids[id1 id2 ...]"
```

### Populate the Georeferenced Facet

We expose the georeferenced items in the Blacklight user interface via a Georeferenced facet:

![Screen shot](doc/georeferenced_facet.png)

```bash
# For Blacklight or GeoBlacklight
rake blacklight_allmaps:index:georeferenced_facet
```

## ActiveRecord Objects — Blacklight::Allmaps::Sidecar 

Blacklight::Allmaps adopts the SolrDocumentSidecar "sidecar" pattern from [Spotlight](https://github.com/projectblacklight/spotlight), adding an ActiveRecord object to the database for each SolrDocument object in the index.

We use this `document.sidecar_allmaps` object to hold the results of the Allmaps Annotation harvest task.

The `Blacklight::Allmaps::Sidecar` object contains:

| Field | Value |
| --- | --- |
| id | primary key |
| solr_document_id | solr document primary key |
| document_type | SolrDocument |
| manifest_id | IIIF Manifest ID |
| annotated | boolean (true\|false) |
| allmaps_id | Allmaps ID |
| iiif_manifest | Copy of the IIIF Manifest |
| allmaps_annotation | Copy of the Allmaps IIIF Annotation |
| solr_version | solr document version number |
| created_at | timestamp |
| updated_at | timestamp |

```ruby
document = SolrDocument.find('harvard-g4124-m2-1855-m3')
document.sidecar_allmaps =>
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

## Allmaps::AnnotationsController

We've added an annotations controller to the application to expose the `Blacklight::Allmaps::Sidecar` data we've harvested. This controller returns only JSON. 

The `#fetch` method will query Allmaps in real time for updated annotation data, should a nightly harvest (rake) be insufficient for Solr indexing or local development needs.

```
Routes for Blacklight::Allmaps::Engine:
fetch_allmaps_annotation GET   /allmaps/annotations/:id/fetch(.:format) allmaps/annotations#fetch {:format=>:json}
     allmaps_annotations GET   /allmaps/annotations(.:format)           allmaps/annotations#index {:format=>:json}
      allmaps_annotation GET   /allmaps/annotations/:id(.:format)       allmaps/annotations#show {:format=>:json}
                         PATCH /allmaps/annotations/:id(.:format)       allmaps/annotations#update {:format=>:json}
                         PUT   /allmaps/annotations/:id(.:format)       allmaps/annotations#update {:format=>:json}
```

## Contributing

For Developer documentation see [doc/developer.md](./doc/development.md)

## License
The gem is available as open source under the terms of the [Apache 2.0 License](https://opensource.org/license/apache-2-0).
