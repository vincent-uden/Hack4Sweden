class Database
  @db = SQLite3::Database.new './database/data.db'
  @db.results_as_hash = true

  def self.execute(*args)
    @db.execute(args[0], args[1])
  end

  def self.db
    @db
  end

  def self.get_article_by_url(url)
    query = "SELECT * FROM articles"
    rows = execute query
    rows.select! { |row| row["url"] == url }
    rows
  end
end
