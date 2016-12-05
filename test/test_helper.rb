ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require "capybara/rails"
require "minitest/rails/capybara"
require 'minitest/autorun'

#Capybara.register_driver :selenium do |app|
#  Capybara::Selenium::Driver.new(app, :browser => :chrome)
#end

Capybara.javascript_driver = :selenium
Capybara.default_max_wait_time = 5
include Rails.application.routes.url_helpers

class ActiveSupport::TestCase
  fixtures :all
  include Capybara::DSL
end

class   ActionDispatch::IntegrationTest < ActiveSupport::TestCase
  def setup
    Capybara.current_driver = Capybara.javascript_driver
  end

  def teardown
    Capybara.use_default_driver
  end
end
