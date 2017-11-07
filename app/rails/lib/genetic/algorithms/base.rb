module Genetic
  module Algorithms
    class Base
      def initialize(parameters)
        @population_size = parameters[:population_size].to_i
        @max_generations = parameters[:max_generations].to_i
        @recombination_probability = parameters[:recombination_probability].to_i
        @mutation_probability = parameters[:mutation_probability].to_i
        @fitness_goal = :minimize
      end

      def solve
        population = Population.new(@chromosomes, @population_size)
        evaluate!(population)

        best = []
        @max_generations.times do |i|
          population.select!(@fitness_goal)
          population.recombine!(@fitness_goal, @recombination_probability)
          population.mutate!(@mutation_probability)
          evaluate!(population)

          Genetic::Utils.array_insert_sorted!(best, population.individuals.first.fitness_score, @fitness_goal)
          top = best[0...10]
          break if top.size == 10 && top.uniq.size == 1
        end

        population.individuals.first.chromosomes
      end
    end
  end
end
