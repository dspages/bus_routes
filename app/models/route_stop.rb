class RouteStop < ApplicationRecord

  has_many :routes,
    primary_key: :id,
    foreign_key: :route_id,
    class_name: :Route

  has_many :stops,
    primary_key: :id,
    foreign_key: :stop_id, 
    class_name: :Stop

end
