class ImagesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    @images=[]
    params[:image].each { |k,v|  @images<< current_user.gallery.images.create(image: v) }
    render json: @images.to_json
  end

end
