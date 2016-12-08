require "test_helper"

class FriendsControllerTest < ActionController::TestCase

  def  setup
    @user1=users(:user1)
    @user2=users(:user2)
    @user3=users(:user3)
    @user4=users(:user4)
  end

  def test_create_friendships_between_users
    login(@user3)
    assert_difference('Friendship.count',2) do
      post :create, friend_id: @user4.id
    end
    assert_response :success
    friend = JSON.parse(@response.body)
    assert_equal @user4.name, friend["name"]
    assert @user3.friends.find_by(id: @user4.id)
    assert @user4.friends.find_by(id: @user3.id)
    assert_equal @friendship.user_id,  @user3.id
    assert_equal @friendship.friend_id,  @user4.id
  end

  def test_create_friendships_without_login
    assert_difference('Friendship.count',0) do
      post :create, friend_id: @user2.id
    end
    assert_response 403
  end

  def test_friendships_destroy_action
    login(@user1)
    assert_difference('Friendship.count',-2) do
      post :destroy, id: @user1.id, friend_id: @user2.id
    end
    assert_response :success
    friend = JSON.parse(@response.body)
    assert_not @user1.friends.find_by(id: @user2.id)
    assert_not @user2.friends.find_by(id: @user1.id)
  end

  def test_friendships_destroy_action_without_login
    assert_difference('Friendship.count',0) do
      post :create, friend_id: @user2.id
    end
    assert_response 403
  end
end
