class CreateStops < ActiveRecord::Migration[5.1]
  def change
    create_table :stops do |t|
      t.integer :stop_id
      t.string :on_street
      t.string :cross_street
      t.string :routes
      t.float :boardings
      t.float :alightings
      t.string :month_beginning
      t.string :daytype
      t.string :location
      t.timestamps
    end
  end
end
