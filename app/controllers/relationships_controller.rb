class RelationshipsController < ApplicationController
  def create
    friend = User.find(params[:friend_id])
    @relationship = current_user.relationships.new(friend: friend)
    if @relationship.save
      render json: @relationship.to_json
    end
  end
end
