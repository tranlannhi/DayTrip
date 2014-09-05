class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.string :origin
      t.string :destination
      t.string :waypoints
      t.string :searchString
      t.timestamps
    end
  end
end
