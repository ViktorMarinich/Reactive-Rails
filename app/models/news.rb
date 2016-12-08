class News < ActiveRecord::Base
  belongs_to :wall
  belongs_to :user
  has_one :gallery

  validates :text ,presence: true, length: { minimum: 1 , maximum: 200}
end
