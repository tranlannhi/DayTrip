require 'spec_helper'

RSpec.describe UsersController, :type => :controller do

	let :valid_attributes do
		{
			first_name: 'Lafferty',
			last_name: 'Daniel',
			email: 'test@email.com'
		}
	end

	describe "POST #create user" do
		it "should create and save a user to the DB" do
			expect do
				post :create, user: valid_attributes
			end.to change(User, :count).by(1)
		end
	end

	describe "DESTROY #delete user" do
		before do
		  @user = User.create! valid_attributes
		end

		it "should delete and save to the DB" do
			expect do
				delete :destroy, id: @user.id
			end.to change(User, :count).by(-1)
		end
	end




end
