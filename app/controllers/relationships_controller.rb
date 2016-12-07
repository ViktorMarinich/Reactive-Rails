class RelationshipsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  
  def create
    friend = User.find(params[:friend_id])
    @relationship = current_user.relationships.new(friend: friend)
    if @relationship.save
      render json: current_user.to_json
    end
  end
end
