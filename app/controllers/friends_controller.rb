class FriendsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    @user = User.find( params[:friend_id])
   if ((@user != current_user)&&(!current_user.friends.find_by(id: @user.id)))
      @friendships=current_user.friendships.new(friend: @user)
      rel = @user.relationships.find_by(friend_id: current_user)
      rel.destroy if rel
      if @friendships.save
        render json: @user.to_json
      end
    else
      rel = @user.relationships.find_by(friend_id: current_user)
      rel.destroy if rel
    end

  end

  def destroy
    friendships = current_user.friendships.find_by(friend: params[:id])
    if friendships.destroy
      render json: friendships.to_json
    end
  end
end
