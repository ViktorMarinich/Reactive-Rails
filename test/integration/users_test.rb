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

  def test_news_on_user_wall
    sign_in
    click_on "My profile"
    assert page.has_content?("News")
    assert page.has_selector?('textarea',:count => 1)
    assert page.has_selector?('button',:count => 1)
    page.fill_in "news", :with => "New news"
    page.find('button[id="create_news"]').click
    assert page.has_content?("New news")
    click_on "Sign Out"
  end

  def test_user_info_on_profile_page
    sign_in
    click_on "My profile"
    assert page.has_selector?('img',:count => 1)
    assert page.has_content?("Profile info")
    assert page.has_content?(@user.name)
    assert page.has_content?(@user.email)
    click_on "Sign Out"
  end

  def sign_in
    page.fill_in "email", :with => @user.email
    page.fill_in "password", :with => "aaaa"
    page.find('button[id="sign_in"]').click
  end
end
