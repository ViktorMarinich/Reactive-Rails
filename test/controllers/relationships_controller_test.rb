require "test_helper"

class RelationshipsControllerTest < ActionController::TestCase

  def  setup
    @user1=users(:user1)
    @user2=users(:user2)
  end

  def test_create_relationships_between_users
    login(@user1)
    assert_difference('Relationship.count',1) do
      post :create, friend_id: @user2.id
    end
    assert_response :success
    current_user = JSON.parse(@response.body)
    assert_equal @user1.name, current_user["name"]
    assert @user1.outcoming.find( @user2.id)
    assert @user2.incoming.find( @user1.id)
  end

  def test_create_relationships_without_login
    assert_difference('Relationship.count',0) do
      post :create, friend_id: @user2.id
    end
    assert_response 403
  end
end
