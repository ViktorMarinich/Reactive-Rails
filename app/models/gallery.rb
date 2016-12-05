class Gallery < ActiveRecord::Base
  belongs_to :user
  belongs_to :news
  has_many :images
end
