module Genetic
  class Population
    attr_reader :individuals

    def initialize(chromosomes, size)
      @individuals = Array.new(size) { Individual.new(chromosomes.shuffle) }
    end

    def evaluate!(fitness_goal)
      evaluated = []

      @individuals.each do |individual|
        individual.evaluate! { |chromosomes| yield(chromosomes) } if !individual.fitness_score

        Genetic::Utils.array_insert_sorted!(evaluated, individual, fitness_goal)
      end

      @individuals = evaluated
    end

    def select!(fitness_goal)
      @individuals = Genetic::Operators.selection(self, fitness_goal)
    end

    def recombine!(fitness_goal, probability)
      @individuals = Genetic::Operators.crossover(self, fitness_goal, probability)
    end

    def mutate!(probability)
      @individuals = Genetic::Operators.mutation(self, probability)
    end

    # Helpers

    def size
      @individuals.size
    end
  end
end
