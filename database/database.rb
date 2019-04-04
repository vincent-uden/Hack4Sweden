class Database
  @db = SQLite3::Database.new './database/data.db'
  @db.results_as_hash = true

  def self.execute(*args)
    @db.execute(*args)
  end
end
