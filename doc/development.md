# Development Notes

## Running App

### Blacklight

TERMINAL 1
bundle exec rake engine_cart:clean
LIGHT=blacklight bundle exec rake blacklight_allmaps:solr

TERMINAL 2
cd .internal_test_app
rake blacklight:index:seed
rails s

### GeoBlacklight

TERMINAL 1
bundle exec rake engine_cart:clean
LIGHT=geoblacklight bundle exec rake blacklight_allmaps:solr

TERMINAL 2
cd .internal_test_app
rake blacklight_allmaps:index:gbl_fixtures
rake blacklight_allmaps:sidecars:harvest:allmaps
rake blacklight_allmaps:index:gbl_georeferenced_facet
rails s

