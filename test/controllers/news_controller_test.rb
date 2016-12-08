require "test_helper"

class NewsControllerTest < ActionController::TestCase

  def  setup
    @user=users(:user1)
    @news=news(:news1)
    @news2=news(:news2)
  end

  def test_create_news_with_images
    login(@user)
    assert_difference('News.count',1) do
      post :create, id: @user, news: { text: "some text"},
         image: [Rails.root.join("public/images/fallback/default.png").open,
         Rails.root.join("public/images/fallback/default.png").open ]
    end
    assert_response :success
    news = JSON.parse(@response.body)
    assert_instance_of(Hash, news)
    assert_equal "some text", news['text']
    assert_equal "/images/fallback/default.png", news['gallery']['images'][0]['image']['url']
  end

  def test_create_news_without_images
    login(@user)
    assert_difference('News.count',1) do
      post :create, id: @user, news: { text: "some text"}
    end
    assert_response :success
    news = JSON.parse(@response.body)
    assert_equal "some text", news['text']
    assert_nil news['gallery']
  end

  def test_create_news_without_login
    assert_difference('News.count',0) do
      post :create, id: @user, news: { text: "some text"}
    end
    assert_equal 403, @response.status
  end

  def test_create_news_with_invalid_text
    login(@user)
    assert_difference('News.count',0) do
      post :create, id: @user, news: { text: ""}
    end
    assert_equal 403, @response.status
  end

  def test_fetching_all_news
    login(@user)
    get :index
    assert_response :success
    all_news = JSON.parse(@response.body)
    assert_equal 2, all_news.length
    assert_equal @news.text, all_news[0]["text"]
    assert_equal @news.user.name, all_news[0]["user"]["name"]
    assert_equal @news2.text, all_news[1]["text"]
    assert_equal @news2.user.name, all_news[1]["user"]["name"]
  end

  def test_fetching_without_login
    get :index
    assert_equal 403, @response.status
  end
end
