class News < ActiveRecord::Base
  belongs_to :wall
  belongs_to :user
  has_one :gallery
end
