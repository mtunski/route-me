class SolveTspJob < ApplicationJob
  queue_as :default

  def perform(client_id, locations, algorithm_parameters)
    tsp = Genetic::Algorithms::Tsp.new(locations, algorithm_parameters)

    ActionCable.server.broadcast(
      "realtime_#{client_id}",
      { route: tsp.solve }
    )
  end
end
