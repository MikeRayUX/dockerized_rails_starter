# frozen_string_literal: true

class Users::RegistrationsController < ApplicationController
  def new; end

  def create
    @user = User.new(user_params)
    if @user.valid?
      @user.save!
      # @user.send_welcome_email!

      sign_in @user

      redirect_to root_path,flash: {
        notice: 'user created'
      }
    else
      redirect_to signup_path, flash: {
        error: @user.errors.full_messages[0]
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(%i[
     email
     password
     password_confirmation
    ])
  end
end
