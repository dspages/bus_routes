json.partial! 'route', route: @route
json.stops do
  json.array! @route.stops, partial: 'api/stops/stop', as: :stops
end
