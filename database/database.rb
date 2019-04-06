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

  def self.get_related_by_url(url)
    article = get_article_by_url(url)[0]
    if article
      topics = execute "SELECT topic_id FROM article_topic_relations WHERE article_id = ?", article["id"]
      topic_ids = topics.map { |topic| topic["topic_id"] }[0..2]

      related = []
      topic_ids.each do |id|
        related.concat (execute "SELECT article_id FROM article_topic_relations WHERE topic_id = ?", id).map { |r| r["article_id"] }
      end
      related.uniq!
      related.delete(article["id"])
      samples = related.sample(3)

      execute "SELECT * FROM articles WHERE id = ? OR id = ? OR id = ?", samples
    end
  end
end
