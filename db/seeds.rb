# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Image.delete_all
Gallery.delete_all
News.delete_all
Wall.delete_all
Relationship.delete_all
Friendship.delete_all
User.delete_all
199.times do |n|
  User.create(name:"Mister#{n}", email: "#{n+1}@ukr.net", password: "aaaa",password_confirmation: "aaaa")
end
z=0
User.all.each do |n|
  z=z+1
  unless z > 180
    User.first.friendships.new(friend: n).save unless User.first == n
  end
end
