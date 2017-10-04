class Tsp
  def initialize(locations, distances)
    @locations = locations
    @distances = distances
    @fitness_goal = :minimize
  end

  def solve
    population = Genetic.initialize_population(@locations, 50)
    evaluate!(population)

    100.times do
      population = Genetic.evolve(population, @fitness_goal)
      evaluate!(population)
    end

    population.first[:individuals]
  end

  private

  def fitness_function(locations)
    total_distance = 0

    locations.each_cons(2) { |leg| total_distance += distance(leg.first, leg.second) }
    total_distance += distance(locations.first, locations.last)

    total_distance
  end

  def distance(from, to)
    @distances.find { |distance| distance[:from] == from && distance[:to] == to }[:distance]
  end

  def evaluate!(population)
    Genetic.evaluate!(population, @fitness_goal) { |locations| fitness_function(locations) }
  end
end
