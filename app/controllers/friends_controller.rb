class FriendsController < ApplicationController
  def create
    @user = User.find( params[:friend_id])
   unless @user == current_user&&!friend?(@user)
      @friendships=current_user.friendships.new(friend: @user)
      rel = @user.relationships.find_by(friend_id: current_user)
      rel.destroy if rel
    end
    if @friendships.save
      render json: current_user.to_json
    end
  end

  def destroy
    friendships = current_user.friendships.find_by(friend: params[:id])
    if friendships.destroy
      render json: friendships.to_json
    end
  end
end
