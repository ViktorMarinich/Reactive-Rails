require 'test_helper'
class ApplicationHelperTest < ActionView::TestCase
include ApplicationHelper
  def  setup
    @user=users(:user1)
    @user1=users(:user2)
  end

  def test_expect_current_user_is_nil
    assert_equal nil, current_user
  end

  def test_set_current_user
    session[:user_id]=@user.id
    assert_equal @user, current_user
  end

  def test_sign_in_method
    sign_in( @user)
    assert_equal @user, current_user
  end

  def test_user_signed_method
    assert_not user_signed_in?
    session[:user_id]=@user.id
    assert user_signed_in?
  end

  def test_sign_out_method
    session[:user_id]=@user.id
    assert session[:user_id]
    sign_out
    assert_not session[:user_id]
  end
end
