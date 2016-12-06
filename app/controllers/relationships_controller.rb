class RelationshipsController < ApplicationController
  def create
    friend = User.find(params[:friend_id])
    @relationship = current_user.relationships.new(friend: friend)
    @relationship.save
  end

  def destroy_outcoming
    friend = User.find(params[:friend_id])
    current_user.outcoming.find_by(friend: friend).destroy
  end
end
