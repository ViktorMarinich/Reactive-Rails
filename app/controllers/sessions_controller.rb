class SessionsController < ApplicationController

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
