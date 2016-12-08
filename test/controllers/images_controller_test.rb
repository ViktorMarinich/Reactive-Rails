require "test_helper"

class ImagesControllerTest < ActionController::TestCase

  def  setup
    @user=users(:user1)
  end

  def test_create_images
    login(@user)
      post :create, image: ['','']
    assert_response :success
    news = JSON.parse(@response.body)
    assert_equal "/images/fallback/default.png", news[0]['image']["url"]

  end

  def test_create_images_without_login
      post :create, image: ['','']
    assert_response 403
  end
end
