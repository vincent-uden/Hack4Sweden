class Database
  @db = SQLite3::Database.new './database/data.db'
  @db.results_as_hash = true

  def self.execute(*args)
    p "EXECUTE"
    p args
    @db.execute(args[0], args[1])
  end

  def self.db
    @db
  end
end
