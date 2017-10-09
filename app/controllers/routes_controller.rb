class RoutesController < ApiController
  before_action :set_client_id

  respond_to :json

  def create
    ActionCable.server.broadcast(
      "realtime_#{client_id}",
      { message: 'test' }
    )

    params.permit!

    locations = params[:locations]
    distances = !params[:distances].blank? && params[:distances].map(&:to_h)
    population_size = params[:population_size].to_i
    max_generations = params[:max_generations].to_i
    crossover_probability = params[:crossover_probability].to_i
    mutation_probability = params[:mutation_probability].to_i

    route = Tsp.new(
      locations,
      distances,
      population_size,
      max_generations,
      crossover_probability,
      mutation_probability,
    ).solve

    respond_with route: route
  end
end
