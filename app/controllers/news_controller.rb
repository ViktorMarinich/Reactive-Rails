class NewsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    @user=User.find(params[:id])
    @wall=@user.wall
    @news=@wall.news.new(text: params[:news][:text])
    current_user.news << @news
    respond_to do |format|
      format.json do
        if @news.save
          render :json => @news.to_json(:include => [:user=>{:only => [:name,:email,:id, :avatar]}])
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
