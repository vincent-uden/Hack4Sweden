class App < Sinatra::Base
  get '/' do
    @articles = (Article.select_all where: 'reports > 0').map { |a| Article.new a }
    slim :index
  end

  get '/reports' do
    url = request.env["HTTP_REPORT_URL"]
    articles = Database.execute("SELECT * FROM articles")
    articles.select! { |row| row["url"] == url}
    response.headers["Access-Control-Allow-Origin"] = "*"
    # {
    #   url: articles[0]["url"],
    #   title: articles[0]["name"]
    # }.to_json
    articles[0].to_json
    # p "RESP: #{resp}"
    # # return resp
    # return "RESPONSE!!!!!!"
  end

  get '/add_topic/:topic' do
    topic = params["topic"]
    p topic
    Database.add_topic topic
    "hello"
  end

  get '/set_topics' do
    id = 2
    topics = [
      "Politics",
      "Russia",
      "Trump"
    ]
    Database.set_topics_for_article id, topics
  end

  post '/add_view' do
    url = request.env["HTTP_VIEW_URL"]
    rows = Database.get_article_by_url url
    row = rows[0]
    if row != nil
      id = row["id"]
      views = row["views"]
    else
      # New website
      name = request.env["HTTP_VIEW_TITLE"]
      Database.execute "INSERT INTO articles (name, url, reports, views) VALUES (?, ?, ?, ?)", [name, url, 0, 0]
      result = Database.execute "SELECT * FROM articles ORDER BY id DESC LIMIT 1"
      result = result[0]
      id = result["id"]
      views = 0
      add_topics_to_article(id, url)
    end
    Database.execute "UPDATE articles SET views = #{views + 1} WHERE id = ?", id
  end

  # TODO! NO WORKIE!!!!! IT GO NIL[] ERROR
  post '/add_report' do
    url     = request.env["HTTP_REPORT_URL"]
    rows    = Database.get_article_by_url url
    article = rows[0]
    reports = article["reports"]
    id      = article["id"]
    Database.execute "UPDATE articles SET reports = #{reports + 1} WHERE id = #{id}"
  end
end
