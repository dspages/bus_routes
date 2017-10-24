class Api::RoutesController < ApplicationController

  def index
    @routes = Route.select("routes.*")
                    .joins(:route_stops)
                    .group("routes.id")
                    .order("COUNT(route_stops.id) DESC")
  end

  def show
    @route = Route.find(params[:id])
  end

end
