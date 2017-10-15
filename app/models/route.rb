class Route < ApplicationRecord

  has_many :route_stops,
    primary_key: :id,
    foreign_key: :route_id,
    class_name: :Route

  has_many :stops,
    through: :route_stop,
    source: :route
    
end
