class User < ActiveRecord::Base
  after_save :create_wall, :create_gallery
  has_one :wall
  has_many :news
  has_one :gallery
  has_many :relationships,foreign_key: "user_id",class_name:  "Relationship", dependent: :destroy
  has_many :outcoming, through: :relationships,  source: :friend
  has_many :reverse_relationships, foreign_key: "friend_id", class_name:  "Relationship", dependent: :destroy
  has_many :incoming, through: :reverse_relationships, source: :user
  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships
  mount_uploader :avatar, ImageUploader
  has_secure_password
  validates :name , length: { minimum: 4 , maximum: 12}
  validates :email, presence: true, uniqueness: {case_sensitive: false}, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i}

  def user_and_friends_ids
    x= self.friend_ids
    x << self.id
  end
  private
  def create_wall
    unless self.wall
      Wall.create(user_id: self.id)
    end
  end

  def create_gallery
    unless self.gallery
      Gallery.create(user_id: self.id)
    end
  end

  def self.bcrypt_string(string,cost=1)
    BCrypt::Password.create(string,cost: cost)
  end
end
