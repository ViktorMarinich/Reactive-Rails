require 'test_helper'
class NewsTest < ActiveSupport::TestCase

  def test_create_news
    assert_difference 'News.count', 1 do
      News.create(text: 'aaa')
      sleep 1
    end
  end

  def test_create_news_with_invalid_text
    assert_difference 'News.count', 0 do
      News.create(text: '')
      sleep 1
    end
    assert_difference 'News.count', 0 do
      News.create(text: 'a'*201)
      sleep 1
    end
  end
  

end
