class User < ActiveRecord::Base
  after_save :create_wall
  has_one :wall
  has_many :news
  has_one :gallery
  has_many :relationships,foreign_key: "user_id",class_name:  "Relationship", dependent: :destroy
  has_many :outcoming, through: :relationships,  source: :friend
  has_many :reverse_relationships, foreign_key: "friend_id", class_name:  "Relationship", dependent: :destroy
  has_many :incoming, through: :reverse_relationships, source: :user
  has_secure_password

  private
  def create_wall
    Wall.create(user_id: self.id)
  end

  def self.bcrypt_string(string,cost=1)
    BCrypt::Password.create(string,cost: cost)
  end
end
