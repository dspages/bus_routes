@routes.each.with_index do |route, idx|
  json.set! idx do
    json.partial! 'route', route: route
  end
end
