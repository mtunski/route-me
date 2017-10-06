class Tsp
  def initialize(locations, distances)
    @locations = locations
    @distances = distances || calculate_distances
    @fitness_goal = :minimize
  end

  def solve
    population = Genetic.initialize_population(@locations.map{ |location| location[:id] }, 200)
    evaluate!(population)

    100.times do
      population = Genetic.evolve(population, @fitness_goal)
      evaluate!(population)
    end

    population.first[:individuals]
  end

  private

  def calculate_distances
    distances = []

    @locations.each do |location1|
      @locations.each do |location2|
        distances << {
          from: location1[:id],
          to: location2[:id],
          distance: Geocoder::Calculations.distance_between(
             [location1[:lat], location1[:lng]],
             [location2[:lat], location2[:lng]]
           )
        }
      end
    end

    distances
  end

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
