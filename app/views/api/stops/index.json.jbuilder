@stops.each.with_index do |stop, idx|
  json.set! idx do
    json.partial! 'stop', stop: stop
  end
end
