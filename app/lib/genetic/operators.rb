module Genetic
  class Operators
    class << self
      def selection(population, fitness_goal)
        selected = [population.individuals.first]

        until selected.size == population.size do
          candidate1, candidate2 = population.individuals.sample(2)

          selected << tournament_of_2(candidate1, candidate2, fitness_goal)
        end

        selected
      end

      def crossover(population, fitness_goal, probability)
        children = []

        until children.size == population.size do
          parent1, parent2 = population.individuals.sample(2)

          if rand(0..100) <= probability
            chromosomes1, chromosomes2 = parent1.chromosomes, parent2.chromosomes

            selected = []
            chromosomes1.each { |id| selected << id if rand(0..100) <= 50 }

            index = 0
            child = chromosomes1.map do |id|
              if selected.include?(id)
                nid = selected[index]
                index += 1
                nid
              else
                id
              end
            end

            children << Genetic::Individual.new(child)
          else
            children << tournament_of_2(parent1, parent2, fitness_goal)
          end
        end

        children
      end

      def mutation(population, probability)
        population.individuals.map do |individual|
          if rand(0..100) >= probability
            individual
          else
            first, second = (0...individual.chromosomes.size).to_a.sample(2)
            mutated = []

            individual.chromosomes.each_with_index do |chromosome, index|
              if index == first
                mutated << individual.chromosomes[second]
              elsif index == second
                mutated << individual.chromosomes[first]
              else
                mutated << chromosome
              end
            end

            Genetic::Individual.new(mutated)
          end
        end
      end

      private

      def tournament_of_2(candidate1, candidate2, fitness_goal)
        fitness_goal == :maximize \
          ? (candidate1 > candidate2 ? candidate1 : candidate2)
          : (candidate1 > candidate2 ? candidate2 : candidate1)
      end
    end
  end
end
