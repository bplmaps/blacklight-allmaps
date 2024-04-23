Blacklight::Allmaps::Engine.routes.draw do
  namespace :allmaps do
    resources :annotations, only: [:index, :show, :update], defaults: { format: :json }
  end
end
