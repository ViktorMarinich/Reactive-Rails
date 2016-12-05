require 'test_helper'

class UsersTest < ActionDispatch::IntegrationTest
  def setup
    super
    @user= users(:user11)
    visit root_path
  end

  def teardown
    super
  end

  def test_news
    page.fill_in "email", :with => @user.email
    page.fill_in "password", :with => "aaaa"
    page.find('button[id="sign_in"]').click
    click_on "My profile"
    assert page.has_content?("News")
    assert page.has_selector?('textarea',:count => 1)
    assert page.has_selector?('button',:count => 1)
    page.fill_in "news", :with => "New news"
    page.find('button[id="create_news"]').click
    assert page.has_content?("New news")
    click_on "My profile"
    
  end
end
