require_relative '../../database/database'

class Article < Table
  table_name 'articles'
  column :id, :int, :prim_key
  column :name, :string255, :no_null
  column :url, :string255, :no_null
  column :reports, :int
  column :views, :int

  def initialize(db_hash)
    super()

    set_id db_hash["id"]
    set_name db_hash["name"]
    set_url db_hash["url"]
    set_reports db_hash["reports"]
    set_views db_hash["views"]
    @db_hash = db_hash
  end
end
