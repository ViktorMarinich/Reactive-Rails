require 'test_helper'

class UsersTest < ActionDispatch::IntegrationTest
  def setup
    super
    @user= users(:user1)
    visit root_path
  end

  def teardown
    super
  end

  def test_sign_in
    page.fill_in "email", :with => @user.email
    page.fill_in "password", :with => "aaaa"
    page.find('button[id="sign_in"]').click
    click_on "My profile"
    assert page.has_content?("Welcome to User Profile")
  end
end
