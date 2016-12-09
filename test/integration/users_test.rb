require 'test_helper'

class UsersTest < ActionDispatch::IntegrationTest
  def setup
    super
    @user= users(:user1)
    @user2= users(:user2)
    visit root_path
  end

  def teardown
    super
  end

  def test_news_on_user_wall
    sign_in(@user)
    assert page.has_content?("News")
    assert page.has_selector?('textarea',:count => 1)
    assert page.has_selector?('button')
    assert_difference 'News.count', 1 do
      page.fill_in "news", :with => "https://www.youtube.com/watch?v=6qOvNgEsZ9s"
      page.find('button[id="create_news"]').click
      sleep 1
    end
    assert page.has_content?("https://www.youtube.com/watch?v=6qOvNgEsZ9s")
    assert page.has_selector?("iframe")
    click_on "Sign Out"
  end

  def test_user_info_on_profile_page
    sign_in(@user)
    assert page.has_selector?('img')
    assert page.has_content?("Profile info")
    assert page.has_content?(@user.name)
    click_on "Sign Out"
  end

  def test_settings_page
    sign_in(@user)
    click_on 'Settings'
    assert page.has_selector?('input',:count => 2)
    assert page.has_content?("Settings")
    page.fill_in "edit_name", :with => "edited name"
    page.fill_in "edit_email", :with => "edited@email.now"
    page.find('button[id="save_changes"]').click
    assert page.has_content?("edited name")
    click_on "Sign Out"
  end

  def test_delete_friend_and_create_new_relationships
    sign_in(@user)
    assert page.has_content?(@user2.name)
    click_on (@user2.name)
    assert page.has_content?(@user.name)
    assert_difference 'Friendship.count', -2 do
      click_on 'Delete'
      sleep 1
    end
    click_on 'My profile'
    assert page.has_no_content?(@user2.name)
    visit ("#/user/#{@user2.id}")
    assert page.has_content?("Add to friends")
    assert page.has_content?(@user2.name)
    assert_difference 'Relationship.count', 1 do
      click_on "Add to friends"
      sleep 1
    end
    click_on "My profile"
    assert page.has_content?("Outcoming")
    click_on "Sign Out"
  end

  def test_create_news_on_friend_wall_and_see_it_at_all_news
    sign_in(@user)
    click_on "Sign Out"
  end

  def sign_in(user)
    page.fill_in "email", :with => user.email
    page.fill_in "password", :with => "aaaa"
    page.find('button[id="sign_in"]').click
  end
end
