class User < ActiveRecord::Base
  has_secure_password

  private

  def self.bcrypt_string(string,cost=1)
    BCrypt::Password.create(string,cost: cost)
  end
end
