class AddSearchStringToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :searchString, :string
  end
end
