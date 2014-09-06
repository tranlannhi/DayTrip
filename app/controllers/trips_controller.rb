class TripsController < ApplicationController

	def create

    	trip = Trip.new(params.require(:trip).permit(:origin, :destination, :searchString, :id))



	  	if trip.save
		  	redirect_to new_trip_path
	    else
	      render 'new'
	  	end

  	end

  	def index
  		# @trip = Trip.find_by_id(params[:id])
	  	@trip = Trip.new


	 end

	  def new
	  	# @trip = Trip.find_by_id(params[:id].to_i)
	  	@trip = Trip.new
	  	# @origin = Origin.new
    # 	@destination = Destination.new

	  end

	def edit

	end

	def destroy
	  	Trip.find(params[:id]).destroy
	  	redirect_to trips_path
	end

end
