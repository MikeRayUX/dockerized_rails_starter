# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  include Accessible
  skip_before_action :check_user, except: %i[new create]
  # # GET /resource/sign_in
  # def new
  #   super
  # end

  # # POST /resource/sign_in
  # def create
  #   super
  #   flash.delete(:notice)
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  def after_sign_in_path_for(resource)
    super(resource)
    root_path
  end

  def after_sign_out_path_for(resource)
    super(resource)
    signin_path
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   added_attrs = %i(full_name phone email)
  #   devise_parameter_sanitizer.permit(:sign_in, keys: added_attrs)
  # end
end
