require 'spec_helper'

RSpec.describe TripsController, :type => :controller do

	let :valid_attributes do
		{
			origin: 'Chicago',
			destination: 'Madison'
		}
	end


	describe "POST #create trip" do
		it "should create and save a trip to the DB" do
			expect do
				post :create, trip: valid_attributes
			end.to change(Trip, :count).by(1)
		end
	end

	describe "DESTROY #delete trip" do
		before do
		  @trip = Trip.create! valid_attributes
		end

		it "should delete and save to the DB" do
			expect do
				delete :destroy, id: @trip.id
			end.to change(Trip, :count).by(-1)
		end
	end


end
