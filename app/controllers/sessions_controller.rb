class SessionsController < ApplicationController

	def new
		# Present an empty login form
		@user = User.new
		@is_login = true
		# redirect_to trips_path(current_user) if current_user
			
	end

	def create
		# Find the user that is trying to log in		
		u = User.where(email: params[:user][:email]).first
		if u && u.authenticate(params[:user][:password_digest])
			# Store as a cookie in the users' browser the ID of them,
			# indicating that they are logged in
			session[:user_id] = u.id.to_s
			redirect_to new_trips_path
		elsif u == nil
			flash[:error] = "Invalid Email"
			render 'new' 
		elsif u && !u.authenticate(params[:user][:password_digest])
			flash[:error] = "Invalid Password"
			render 'new' 
		end

		# user = User.authenticate(params[:email], params[:password])
  # 		if user
  #   		session[:user_id] = user.id
  #   		redirect_to new_trips_path, :notice => "Logged in!"
  # 		else
  #   		flash.now.alert = "Invalid email or password"
  #   		render "new"
  # 		end

	end

	def destroy
		reset_session
		redirect_to trips_path
	end


end
