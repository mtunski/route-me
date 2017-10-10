module Genetic
  module Algorithms
    class Tsp < Base
      def initialize(locations, parameters)
        super(parameters)
        @locations = locations
        @distances = calculate_distances
        @chromosomes = @locations.map{ |location| location[:id] }
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
                 location1.values_at(:lat, :lng),
                 location2.values_at(:lat, :lng)
               )
            }
          end
        end

        distances
      end

      def evaluate!(population)
        population.evaluate!(@fitness_goal) { |locations| fitness_function(locations) }
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
    end
  end
end
