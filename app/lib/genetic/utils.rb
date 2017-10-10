module Genetic
  module Utils
    class << self
      def array_insert_sorted!(array, element, fitness_goal)
        search_proc = fitness_goal == :maximize \
          ? ->(e) { e < element }
          : ->(e) { e > element }

          array.insert(
            array.bsearch_index(&search_proc) || array.length,
            element
          )
      end
    end
  end
end
