class ItinerariesController < ApplicationController
	respond_to :json, :html

	def index
		@itineraries = Itinerary.all
		respond_with @itineraries, # responds to objects only
		each_serializer: AccountSerializer
	end

	def show
		@itineraries = Itinerary.find(params[:id])
	end

	def default_serializer_options
		{root: false}
	end

end
