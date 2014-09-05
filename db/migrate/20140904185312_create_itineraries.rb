class CreateItineraries < ActiveRecord::Migration
  def change
    create_table :itineraries do |t|
      t.string :start_point
      t.string :end_point
      t.string :waypoints

      t.timestamps
    end
  end
end
