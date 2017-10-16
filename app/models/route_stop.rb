class RouteStop < ApplicationRecord

  belongs_to :route,
    primary_key: :id,
    foreign_key: :route_id,
    class_name: :Route

  belongs_to :stop,
    primary_key: :id,
    foreign_key: :stop_id,
    class_name: :Stop

end
