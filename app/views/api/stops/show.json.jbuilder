json.partial! 'stop', stop: @stop
json.routes do
  json.array! @stop.routes, partial: 'api/routes/route', as: :route
end

json.accessible_stops do
  json.array! @stop.accessible_stops, partial: 'api/stops/stop', as: :stop
end
