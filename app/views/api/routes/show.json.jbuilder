json.partial! 'route', route: @route
json.stops do
  json.array! @route.stops, partial: 'api/stops/stop', as: :stop
end

json.transfers do
  json.array! @route.transferrable_routes, partial: 'api/routes/route', as: :route
end
