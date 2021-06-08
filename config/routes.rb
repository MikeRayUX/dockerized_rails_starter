Rails.application.routes.draw do
  root to: 'static_pages/landing_pages#index'

  devise_for :users,
             path: 'users',
             controllers: {
               sessions: 'users/sessions', passwords: 'users/passwords'
             }

  devise_scope :user do
    get '/signin', to: 'users/sessions#new'
    get '/signup', to: 'users/registrations#new'
  end

  get '/termsofservice', to: 'static_pages/tos_pages#index'
  get '/privacypolicy', to: 'static_pages/privacy_policy_pages#index'

  namespace :users do
    resource :registrations, only: %i[create]
  end

end
