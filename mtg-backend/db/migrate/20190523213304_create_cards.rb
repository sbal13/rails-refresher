class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :name
      t.string :text
      t.string :image_url
      t.string :api_id

      t.timestamps
    end
  end
end
