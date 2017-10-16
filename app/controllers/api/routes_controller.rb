class Api::RoutesController < ApplicationController

  def index
    @routes = Route.all
  end

  def show
    @route = Route.find(params[:id])
    @stops = @route.stops
  end

end
