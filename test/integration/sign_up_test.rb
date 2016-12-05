require 'test_helper'

class UsersTest < ActionDispatch::IntegrationTest
  def setup
    super
    visit root_path
  end

  def teardown
    super
  end

  def test_create_new_user
    page.fill_in "name_field", :with => "name"
    page.fill_in "email_field", :with => "theusewr@a.net"
    page.fill_in "password_field", :with => "password"
    page.fill_in "password_confirmation_field", :with => "password"
    page.find('button[id="sign_up"]').click
    click_on "My profile"
    assert page.has_content?("Welcome to User Profile")
  end
end
