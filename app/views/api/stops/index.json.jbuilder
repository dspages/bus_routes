@stops.each do |stop|
  json.set! stop.id do
    json.partial! 'stop', stop: stop
  end
end
