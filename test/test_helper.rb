ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require "capybara/rails"
require "minitest/rails/capybara"
require 'minitest/autorun'
require 'database_cleaner'

DatabaseCleaner.strategy = :transaction
Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.javascript_driver = :selenium
Capybara.default_max_wait_time = 5
include Rails.application.routes.url_helpers

class ActiveSupport::TestCase
  fixtures :all
  include Capybara::DSL

  def login(user)
    old_controller = @controller
    @controller = SessionsController.new
    post :create, session: { email:  user.email, password: 'aaaa' }
    @controller = old_controller
  end

end

class   ActionDispatch::IntegrationTest < ActiveSupport::TestCase
  def setup
    DatabaseCleaner.start
    Capybara.current_driver = Capybara.javascript_driver
  end

  def teardown
    DatabaseCleaner.clean
    Capybara.use_default_driver
  end
end
