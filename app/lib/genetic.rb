class Genetic
  class << self
    def initialize_population(chromosomes, size)
      Array.new(size) { { individuals: chromosomes.shuffle, fitness_score: nil } }
    end

    def evolve(population, fitness_goal)
      population = select(population, fitness_goal)
      population = crossover(population, fitness_goal)
      population = mutate(population)
      population
    end

    def evaluate!(population, fitness_goal)
      population.each do |genotype|
        genotype[:fitness_score] = yield genotype[:individuals]
      end

      sort_direction = fitness_goal == :minimize ? 1 : -1
      population.sort_by! { |genotype| sort_direction * genotype[:fitness_score] }
    end

    private

    def select(population, fitness_goal)
      selected = [population.first]

      until selected.size == population.size do
        candidate1 = population.sample
        candidate2 = population.sample
        selected << tournament(candidate1, candidate2, fitness_goal)
      end

      selected
    end

    def crossover(population, fitness_goal, probability: 80)
      children = []

      until children.size == population.size do
        parent_1 = population.sample
        parent_2 = population.sample

        if rand(0..100) <= probability
          p1 = parent_1[:individuals]
          p2 = parent_2[:individuals]

          selected = []
          p2.each { |id| selected << id if rand(0..100) <= 50 }

          index = 0
          child = p1.map do |id|
            if selected.include?(id)
              nid = selected[index]
              index += 1
              nid
            else
              id
            end
          end

          children << {
            individuals: child,
            fitness_score: nil
          }
        else
          children << tournament(parent_1, parent_2, fitness_goal)
        end
      end

      children
    end

    def mutate(population, probability: 10)
      population.map do |genotype|
        if rand(0..100) >= probability
          genotype
        else
          first, second = (0...genotype[:individuals].size).to_a.sample(2)
          mutated = []

          genotype[:individuals].each_with_index do |chromosome, index|
            if index == first
              mutated << genotype[:individuals][second]
            elsif index == second
              mutated << genotype[:individuals][first]
            else
              mutated << chromosome
            end
          end

          { individuals: mutated, fitness_score: nil }
        end
      end
    end

    def tournament(candidate1, candidate2, fitness_goal)
      fitness_goal == :minimize \
       ? (candidate1[:fitness_score] < candidate2[:fitness_score] ? candidate1 : candidate2)
       : (candidate1[:fitness_score] > candidate2[:fitness_score] ? candidate1 : candidate2)
    end
  end
end
