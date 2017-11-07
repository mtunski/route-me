Rails.application.routes.draw do
  root to: "pages#index"

  get "*path", to: "pages#index"

  namespace :api do
    post "/tsp", to: "tsp#solve"
  end
end
