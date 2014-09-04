class AccountsController < ApplicationController
	respond_to :json, :html

	def index
		@accounts = Account.all
		respond_with @accounts, # responds to objects only
		each_serializer: AccountSerializer
	end

	def show
		@account = Account.find(params[:id])
	end

	def default_serializer_options
		{root: false}
	end

end
