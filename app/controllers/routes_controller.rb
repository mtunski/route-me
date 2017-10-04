class RoutesController < ApiController
  respond_to :json

  def create
    params.permit!

    locations = params[:locations]
    distances = params[:distances].map(&:to_h)

    respond_with route: Tsp.new(locations, distances).solve
  end
end
