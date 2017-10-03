Rails.application.routes.draw do
  root to: "pages#index"

  resource :route, only: %i[create]
end
