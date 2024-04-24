# Development Notes

## Running the Application

### Blacklight / MARC

IIIF Manifest URI is likely in 856 4#$u
https://www.loc.gov/marc/bibliographic/bd856.html

Solr Field: iiif_manifest_url_ssi (from Spotlight fixtures)
Georeferenced Field: georeferenced_bsi (Blacklight dynamicField Schema)

@TODO: Use mods_xml_ssm instead of marc_ss?

#### TERMINAL 1 / Run Solr

```
bundle exec rake engine_cart:clean
LIGHT=blacklight bundle exec rake blacklight_allmaps:solr
```

#### TERMINAL 2 / Index
```
cd .internal_test_app
rake blacklight_allmaps:index:bl_fixtures
rake blacklight_allmaps:sidecars:harvest:allmaps
rake blacklight_allmaps:index:bl_georeferenced_facet
rails s
```

### GeoBlacklight / Aardvark Schema

IIIF Manifest URI is in dct_references_s
https://opengeometadata.org/ogm-aardvark/#references
Key: http://iiif.io/api/presentation#manifest

Solr Field: dct_references_s
Georeferenced Field: gbl_georeferenced_b (Aardvark Schema)

#### TERMINAL 1 / Run Solr
```
bundle exec rake engine_cart:clean
LIGHT=geoblacklight bundle exec rake blacklight_allmaps:solr
```

#### TERMINAL 2 / Index, Harvest, Facet
```
cd .internal_test_app
rake blacklight_allmaps:index:gbl_fixtures
rake blacklight_allmaps:sidecars:harvest:allmaps
rake blacklight_allmaps:index:gbl_georeferenced_facet
rails s
```

## Building the Javascript / Publishing the NPM Package

The javascript is built by npm from sources in `app/javascript` into a bundle
in `app/assets/javascripts/blacklight/allmaps/blacklight-allmaps.js`. This file should not be edited by hand as any changes would be overwritten.  When any of the javascript
components in the gem are changed, this bundle should be rebuild with the
following steps:
1. [Install npm](https://www.npmjs.com/get-npm)
1. run `npm install` to download dependencies
1. run `npm run prepare` to build the bundle
1. run `npm publish` to push the javascript package to https://npmjs.org/package/blacklight-allmaps

## Running the Test suite

LIGHT=geoblacklight bundle exec rake ci
