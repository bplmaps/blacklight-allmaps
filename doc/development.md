# Development Notes

## Running App

### Blacklight

LIGHT=blacklight bundle exec rake blacklight_allmaps:solr
rake blacklight:index:seed

### GeoBlacklight

LIGHT=geoblacklight bundle exec rake blacklight_allmaps:solr
cd .internal_test_app
rake blacklight_allmaps:index:gbl_fixtures
rake blacklight_allmaps:sidecars:harvest:allmaps
rake blacklight_allmaps:index:gbl_georeferenced_facet
rails s

