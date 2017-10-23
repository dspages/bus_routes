class Api::StopsController < ApplicationController
  
  def index
    @stops = Stop.select("stops.*")
                    .joins(:route_stops)
                    .group("stops.id")
                    .order("COUNT(route_stops.id) DESC")
  end

  def show
    @stop = Stop.find(params[:id])
    @routes = @stop.routes
  end

end
