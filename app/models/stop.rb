class Stop < ApplicationRecord

  has_many :route_stops,
    primary_key: :id,
    foreign_key: :stop_id,
    class_name: :RouteStop

  has_many :stops,
    through: :route_stops,
    source: :route

  def populate_routes
    sql =
    "SELECT *
    FROM routes
    ORDER BY routes.stops
    LIMIT 5"
    stops = ActiveRecord::Base.connection.execute(sql)
    stops.getvalue
  end

end
