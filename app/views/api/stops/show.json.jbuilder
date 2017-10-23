json.partial! 'stop', stop: @stop
json.routes do
  json.array! @stop.routes, partial: 'api/routes/route', as: :route
end
