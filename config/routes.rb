Rails.application.routes.draw do
  root to: "pages#index"

  resource :tsp, only: %i[create], controller: :tsp
end
