module ApplicationHelper

  def sign_in(user)
    session[:user_id] = user.id
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def user_signed_in?
    !current_user.nil?
  end

  def sign_out
    return false unless user_signed_in?
    session[:user_id] = nil
  end
end
