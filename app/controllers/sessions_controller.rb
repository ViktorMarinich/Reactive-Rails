class SessionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_filter :authenticate , only: [:destroy]

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      sign_in user
      render json: current_user.to_json
    else
      render json: current_user.to_json
    end
  end

  def destroy
    sign_out
    redirect_to root_path
  end
end
