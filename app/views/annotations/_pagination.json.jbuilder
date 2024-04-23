json.pagination do
  current, total, per_page = collection.current_page, collection.total_pages, collection.limit_value
  json.current  current
  json.previous (current > 1 ? (current - 1) : nil)
  json.next     (current == total ? nil : (current + 1))
  json.per_page per_page
  json.pages    total
  json.count    collection.total_count
end