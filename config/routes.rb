Blacklight::Allmaps::Engine.routes.draw do
  namespace :allmaps do
    resources :annotations, only: [:index, :show, :update], defaults: {format: :json} do
      member do
        get "fetch"
      end
    end
  end
end
