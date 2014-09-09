class TripsController < ApplicationController

	def create
    @trip = Trip.new(params.require(:trips).permit(:origin, :destination, :searchString, :id))
	  	if @trip.save
		  	redirect_to new_trip_path
		  	puts Trip.last
	    else
	      render 'new'
	  	end
  end

  def index
  	@trips = Trip.all
	  @trip = Trip.new
	end

	def new
	  @trip = Trip.new
	 end

	def edit

	end

	def destroy
	  	Trip.find(params[:id]).destroy
	  	redirect_to trips_path
	end

end
