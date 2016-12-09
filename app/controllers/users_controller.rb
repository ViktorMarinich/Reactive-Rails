class UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_filter :authenticate , only: [:update]

  def index
  end

  def current
    @user = current_user
    render json:  @user.to_json( :include => [{:friends => {:only => [:name,:id, :avatar]}},{:gallery=>{:include=> [
        :images=> {:only => [:image, :id]}],:only => :id}}])
  end

  def create
    unless user_signed_in?
      @user = User.new(user_params)
      if @user.save
        sign_in(@user)
        render :json => @user.to_json
      else
        render :json => @user.errors.to_json
      end
    end
  end

  def update
    @user = User.find(params[:id])
    if params[:user][:avatar]
      @user.avatar = params[:user][:avatar]
    end
    @user.name = params[:user][:name]
    @user.email= params[:user][:email]
    if @user.save
      render :json => @user.to_json
    else
      render :json => @user.errors
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user.to_json( :include => [
         {:friends => {:only => [:name,:id,:avatar]}},
         {:wall =>{:include=>{
             :news =>{:include => [{
                :user=>{:only => [:name,:id,:avatar]}},
                :gallery=>{:include=> [:images=> {:only => [:image, :id]}]}],:only => [:id,:text]}},:only => :id}},
         {:gallery=>{:include=> [
             :images=> {:only => [:image, :id]}],:only => :id}},
         {:incoming=>{:only => [:name,:id,:avatar]}},
          :outcoming=>{:only => [:name,:id,:avatar]}],
      :only => [:name,:email,:id,:avatar] )
  end

  private

  def user_params
    params.required(:user).permit(:name,:email, :password, :password_confirmation, :avatar)
  end
end
