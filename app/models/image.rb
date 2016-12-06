class Image < ActiveRecord::Base
  belongs_to :gallery
  mount_uploader :image, ImageUploader
end
