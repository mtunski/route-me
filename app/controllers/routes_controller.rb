class RoutesController < ApiController
  before_action :set_client_id

  respond_to :json

  def create
    ActionCable.server.broadcast(
      "realtime_#{client_id}",
      { message: 'test' }
    )

    params.permit!

    tsp = Genetic::Algorithms::Tsp.new(params[:locations], params[:algorithm_parameters])
    respond_with route: tsp.solve
  end

end
