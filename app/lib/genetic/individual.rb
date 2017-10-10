module Genetic
  class Individual
    attr_reader :chromosomes, :fitness_score

    def initialize(chromosomes)
      @chromosomes = chromosomes
      @fitness_score = nil
    end

    def evaluate!
      @fitness_score = yield(@chromosomes)
    end

    # override
    def <=>(other)
      @fitness_score <=> other.fitness_score
    end

    # override
    def >(other)
      @fitness_score > other.fitness_score
    end

    # override
    def <(other)
      @fitness_score < other.fitness_score
    end
  end
end
