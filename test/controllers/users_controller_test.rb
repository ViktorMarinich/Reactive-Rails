require "test_helper"

class UsersControllerTest < ActionController::TestCase

  def  setup
    @user=users(:user1)
  end

  def test_sign_up
    email = "aaaa@ukr.net"
    assert_difference('User.count',1) do
      post :create, user: { name: @user.name, email: email,
         password: "aaaa",password_confirmation: "aaaa",
         avatar: Rails.root.join("public/images/fallback/default.png").open }
    end
    assert_response :success
    assert assigns(:user).name
    user = JSON.parse(@response.body)
    assert_instance_of(Hash, user)
    assert_equal 200, @response.status
    assert_equal @user.name, user["name"]
    assert_equal email, user["email"]
    assert_equal '/images/fallback/default.png', user["avatar"]["url"]
  end

  def test_registration_with_invalid_name
    assert_difference('User.count',0) do
      post :create, user: { name: "new", email: "aaaa@ukr.net", password: "aaaa",
        password_confirmation: "aaaa" }
    end
    errors = JSON.parse(@response.body)
    assert_equal 403, @response.status
    assert_equal "is too short (minimum is 4 characters)", errors["name"][0]
  end

  def test_registration_with_invalid_email
    assert_difference('User.count',0) do
      post :create, user: { name: @user.name, email: "aaaa.ukr.net",
        password: "aaaa",password_confirmation: "aaaa" }
    end
    errors = JSON.parse(@response.body)
    assert_equal 403, @response.status
    assert_equal  "is invalid", errors["email"][0]
  end

  def test_update_user_params
    login(@user)
    patch :update, id: @user, user: { name: "new name", email: "new@email.com" }
    assert_equal 200, @response.status
    assert_equal assigns(:user).name, "new name"
    assert_equal assigns(:user).email, "new@email.com"
  end

  def test_update_with_invalid_params
    login(@user)
    patch :update, id: @user, user: { name: "ne", email: '123321' }
    errors = JSON.parse(@response.body)
    assert_equal 403, @response.status
    assert_equal "is too short (minimum is 4 characters)", errors["name"][0]
    assert_equal  "is invalid", errors["email"][0]
  end

  def test_update_without_login
    patch :update, id: @user, user: { name: "valid name", email: 'valid@emal.com' }
    assert_equal 403, @response.status
  end

  def test_fetch_current_user_without_login
    get :current
    assert_response :success
    assert_equal assigns(:current_user), nil
  end

  def test_fetch_current_user
    login(@user)
    get :current
    assert_response :success
    current_user = JSON.parse(@response.body)
    assert_equal @user.id, current_user['id']
    assert_equal @user.name, current_user['name']
    assert_equal @user.email, current_user['email']
  end

  def test_show_user_action
    get :show, id: @user
    assert_response :success
    user = JSON.parse(@response.body)
    assert_equal @user.id, user['id']
    assert_equal @user.name, user['name']
    assert_equal @user.email, user['email']
  end
end
