require 'test_helper'

class UsersTest < ActionDispatch::IntegrationTest
  def setup
    super
  end

  def teardown
    super
  end

  def test_sign_in
    @user =User.create(email: "1@ukr.net", name: "pampam", password: 'aaaa',
    password_confirmation: "aaaa")
    page.fill_in "email", :with => @user.email
    page.fill_in "password", :with => "aaaa"
    page.find('button[id="sign_in"]').click
    assert page.has_content?("Welcome to User Profile")
  end
end
