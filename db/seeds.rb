# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Stop.delete_all
Route.delete_all
RouteStop.delete_all

def parse_line(line)
  line = line.chomp
  line = line.split("\"")
  coords = [line.last]
  if line.length > 2
    first_part = line[0].split(",")
    routes = [line[1]]
    middle_part = line[2].split(",")
    middle_part.shift
  else
    first_part = line[0].split(",")
    routes = []
    middle_part = []
  end
  line = first_part + routes + middle_part + coords
  raise "invalid line error!" + line.to_s if line.length != 9
  line
end

File.open(
'./db/CTA_-_Ridership_-_Avg._Weekday_Bus_Stop_Boardings_in_October_2012.csv',
'r') do |file|
  all_routes = {}
  headers = file.gets.chomp.split(",")
  while line = file.gets
    next if line.length < 3
    line = parse_line(line)
    obj = {}
    headers.each.with_index do |header, idx|
      obj[header] = line[idx]
    end
    stop = Stop.create(obj)
    routes = obj["routes"].split(",")
    routes.each do |route|
      if all_routes[route].nil?
        #p all_routes
        this_route = Route.create(route_name: route)
        RouteStop.create(route_id: this_route.id, stop_id: stop.id)
        all_routes[route] = [obj["stop_id"].chomp]
      else
        this_route = Route.find_by route_name: route
        RouteStop.create(route_id: this_route.id, stop_id: stop.id)
        all_routes[route].push(obj["stop_id"].chomp)
      end
    end

  end
end

#
##
