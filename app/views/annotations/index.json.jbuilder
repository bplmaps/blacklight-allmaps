json.partial! "pagination", collection: @annotations
json.data do
  json.array! @annotations, partial: "annotations/annotation", as: :annotation
end
