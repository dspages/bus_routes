Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :stops, only: [:index, :show]
  resources :route_stops, only: [:index, :show]
  resources :routes, only: [:index, :show]
end
