class Route < ApplicationRecord

  has_many :route_stops,
    primary_key: :id,
    foreign_key: :route_id,
    class_name: :RouteStop

  has_many :stops,
    through: :route_stops,
    source: :route

  def self.max_route

    p ActiveRecord::Base.connection.execute(
      "SELECT routes.route_name,  count(DISTINCT route_stops)
      FROM routes
      JOIN route_stops ON route_stops.route_id = routes.id
      GROUP BY routes.route_name
      ORDER BY count(DISTINCT route_stops) DESC
      LIMIT 1"
    ).values

  end

end
