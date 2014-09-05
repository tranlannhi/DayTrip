class UsersController < ApplicationController

	def index
		@user = User.all
	end

	def new
		@user = User.new
	end

	def create
    	@user = User.new(params.require(:user).permit(:first_name, :last_name, :email, :password))
    		if @user.save
      			session[:user_id] = @user.id.to_s
      			redirect_to new_user_path
    		else
      			render 'new'
    		end
	end

	def destroy
		User.find(params[:id]).destroy
    	redirect_to trips_path
	end

end
