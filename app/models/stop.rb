class Stop < ApplicationRecord

  has_many :route_stops,
    primary_key: :id,
    foreign_key: :stop_id,
    class_name: :RouteStop

  has_many :routes,
    through: :route_stops,
    source: :route

  def self.sum_boardings
    p ActiveRecord::Base.connection.execute(
      "SELECT sum(boardings)
      FROM stops"
    ).values
  end

  def self.average_boardings
    p ActiveRecord::Base.connection.execute(
      "SELECT avg(boardings)
      FROM stops"
    ).values
  end

  def self.max_boardings
    p ActiveRecord::Base.connection.execute(
      "SELECT max(boardings)
      FROM stops"
    ).values
  end

  def self.max_alightings
    p ActiveRecord::Base.connection.execute(
      "SELECT max(alightings)
      FROM stops"
    ).values
  end

  def self.max_stop
    p ActiveRecord::Base.connection.execute(
      "SELECT stops,  count(DISTINCT route_stops)
      FROM stops
      JOIN route_stops ON route_stops.stop_id = stops.id
      GROUP BY stops.id
      ORDER BY count(DISTINCT route_stops) DESC
      LIMIT 1"
    ).values
  end

end
