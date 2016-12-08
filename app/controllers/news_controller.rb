class NewsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    @news = News.where(wall_id: Wall.where(user_id: current_user.user_and_friends_ids))
    render :json => @news.to_json(:include => [:user=>{:only => [:name,:email,:id, :avatar]},:gallery=>{:include=> {:images=> [:only => :image, :id]}}])
  end

  def create
    @user=User.find(params[:id])
    @wall=@user.wall
    @news=@wall.news.new(text: params[:news][:text])
    if params[:image]
      Gallery.create(news: @news)
      params[:image].each do |k,v|
        @image = @news.gallery.images.create(image: v)
      end
    end
    current_user.news << @news
    respond_to do |format|
      format.json do
        if @news.save
          render :json => @news.to_json(:include => [{
             :user=>{:only => [:name,:id,:avatar]}},
             :gallery=>{:include=> [
                 :images=> {:only => [:image, :id]}]}],:only => [:id,:text])
        else
          render :json => { :errors => @news.to_json }
        end
      end
    end
  end

  private

  def news_params
    params.require(:news).permit(:text,:user_id,:wall_id)
  end
end
