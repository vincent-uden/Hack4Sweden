class Database
  @db = SQLite3::Database.new './database/data.db'
  @db.results_as_hash = true

  def self.execute(*args)
    @db.execute(args[0], args[1])
  end

  def self.db
    @db
  end

  def self.get_topic(label)
    (execute "SELECT * FROM topics WHERE label = ?", label)[0]
  end

  def self.add_topic(label)
    if (get_topic label) == nil
      execute "INSERT INTO topics (label) VALUES (?)", label
    end
  end

  def self.set_topics_for_article(article_id, topic_labels)
    topic_labels.each { |label| add_topic label }
    topics = execute "SELECT * FROM topics"
    topics_hash = Hash.new
    topics.each { |topic| topics_hash[topic["label"]] = topic["id"] }

    execute "DELETE FROM article_topic_relations WHERE article_id = ?", article_id
    topic_labels.each do |topic_label|
      execute "INSERT INTO article_topic_relations (article_id, topic_id) VALUES (?, ?)", [article_id, topics_hash[topic_label]]
    end
  end

  def self.get_article_by_url(url)
    query = "SELECT * FROM articles"
    rows = execute query
    rows.select! { |row| row["url"] == url }
    rows
  end
end
