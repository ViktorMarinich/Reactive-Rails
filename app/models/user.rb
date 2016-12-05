class User < ActiveRecord::Base
  after_save :create_wall
  has_one :wall
  has_many :news
  has_secure_password

  private
  def create_wall
    Wall.create(user_id: self.id)
  end

  def self.bcrypt_string(string,cost=1)
    BCrypt::Password.create(string,cost: cost)
  end
end
