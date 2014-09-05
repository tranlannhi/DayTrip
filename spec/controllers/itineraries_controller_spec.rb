require 'spec_helper'

RSpec.describe ItinerariesController, :type => :controller do

	describe "GET #index" do 
		it "should succeed" do
			expect(response).to be_success
		end
	end

end
