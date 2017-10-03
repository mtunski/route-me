class RoutesController < ApiController
  respond_to :json

  def create
    respond_with route: "ROUTE"
  end
end
