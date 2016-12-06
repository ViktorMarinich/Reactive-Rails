# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161206103323) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friends", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "friend_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "friends", ["user_id"], name: "index_friends_on_user_id", using: :btree

  create_table "galleries", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "news_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "galleries", ["news_id"], name: "index_galleries_on_news_id", using: :btree
  add_index "galleries", ["user_id"], name: "index_galleries_on_user_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "image"
    t.integer  "gallery_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "images", ["gallery_id"], name: "index_images_on_gallery_id", using: :btree

  create_table "news", force: :cascade do |t|
    t.string   "text"
    t.integer  "wall_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "news", ["user_id"], name: "index_news_on_user_id", using: :btree
  add_index "news", ["wall_id"], name: "index_news_on_wall_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "avatar"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "walls", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "walls", ["user_id"], name: "index_walls_on_user_id", using: :btree

  add_foreign_key "friends", "users"
  add_foreign_key "galleries", "news"
  add_foreign_key "galleries", "users"
  add_foreign_key "images", "galleries"
  add_foreign_key "news", "users"
  add_foreign_key "news", "walls"
  add_foreign_key "walls", "users"
end
