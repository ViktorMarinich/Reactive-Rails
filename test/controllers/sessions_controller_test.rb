require "test_helper"

class SessionsControllerTest < ActionController::TestCase

  def  setup
    @user=users(:user1)
  end

  def test_login
    post :create, session: { email: @user.email,password: 'aaaa'}
    assert_response :success
    @current_user = JSON.parse(@response.body)
    assert_equal @user.id, @current_user['id']
    assert_equal @user.name, @current_user['name']
    sessions_controller = @controller
    @controller = UsersController.new
    get :current
    assert_response :success
    assert_equal @current_user['id'], JSON.parse(@response.body)['id']
    @controller = sessions_controller
  end

  def test_login_with_invalid_parameters
    post :create, session: { email: @user.email,password: 'invalid param'}
    assert_response :success
    assert_equal 'null', @response.body
    post :create, session: { email: 'invalid@email.net',password: 'aaaa'}
    assert_response :success
    assert_equal 'null', @response.body
  end

  def test_destroy_session
    login(@user)
    get :destroy
    assert_response 302
    sessions_controller = @controller
    @controller = UsersController.new
    get :current
    assert_response :success
    assert_equal 'null', @response.body
    @controller = sessions_controller
  end
end
