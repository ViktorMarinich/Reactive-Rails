class Friend < ActiveRecord::Base
  belongs_to :user
  after_save :revese_friend_confirm
  after_destroy :revese_friend_destroy

  def revese_friend_confirm
    unless friend=Friendship.find_by(friend: self.user, user: self.friend)
      friend=self.friend.friendships.create(friend: self.user)
    end
  end

  def revese_friend_destroy
    if friend=Friendship.find_by(friend: self.user, user: self.friend)
      friend.destroy
    end
  end
end
