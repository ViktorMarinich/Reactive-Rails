class UsersController < ApplicationController
  def index
  end

  def current
   @user = current_user
   render json:  @user.to_json
end
end
