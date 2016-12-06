class UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
  end

  def current
    @user = current_user
    render json:  @user.to_json
  end

  def create
    unless user_signed_in?
      @user = User.new(user_params)
      if @user.save
        sign_in(@user)
        render :json => @user.to_json
      else
        render :json => { :errors => @user.errors }
      end
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user.to_json( :include => [{
         :wall =>{:include=>{
             :news =>{:include => [{
                :user=>{:only => [:name,:id,:avatar]}},
                :gallery=>{:include=> [:images=> {:only => [:image, :id]}]}],:only => [:id,:text]}},:only => :id}},
         :gallery=>{:include=> [
             :images=> {:only => [:image, :id]}],:only => :id}],
      :only => [:name,:email,:id,:avatar] )
  end

  private

  def user_params
    params.required(:user).permit(:name,:email, :password, :password_confirmation, :avatar)
  end
end
