require 'test_helper'
class UserTest < ActiveSupport::TestCase

  def setup
    @params = {name: "User1", email: "mail@ukr.net", password: "aaaa",
      password_confirmation: "aaaa",
      avatar: Rails.root.join("public/images/fallback/default.png").open }
  end

  def test_user_with_valid_values
    user = User.new(@params)
    assert user.save
  end

  def test_user_with_invalid_email
    @params[:email]= ""
    user = User.new(@params)
    assert_not user.save
    @params[:email]= "mail.ukr.net"
    user = User.new(@params)
    assert_not user.save
  end

  def test_user_with_invalid_name
    @params[:name]= ""
    user = User.new(@params)
    assert_not user.save
    @params[:name]= "aaa"
    user = User.new(@params)
    assert_not user.save
    @params[:name]= "User with very long name"
    user = User.new(@params)
    assert_not user.save
  end

  def test_user_with_different_password_and_password_confirmation
    @params[:password]= "different"
    user = User.new(@params)
    assert_not user.save
    @params[:password]= ""
    user = User.new(@params)
    assert_not user.save
  end
end
