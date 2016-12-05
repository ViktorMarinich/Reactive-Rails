class News < ActiveRecord::Base
  belongs_to :wall
  belongs_to :user
  has_many :galleries
end
