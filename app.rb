class App < Sinatra::Base
  get '/' do
    @articles = (Article.select_all where: 'reports > 0').map { |a| Article.new a }
    slim :index
  end

  get "/stats" do
      slim :stats
  end

  # --- API STUFF ---

  # Get reports for an article or post based on a url
  get '/reports' do
    url = request.env["HTTP_REPORT_URL"]
    articles = Database.execute("SELECT * FROM articles")
    articles.select! { |row| row["url"] == url}
    response.headers["Access-Control-Allow-Origin"] = "*"
    articles[0].to_json
  end

  # VINCENTTTT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
  get '/add_topic/:topic' do
    topic = params["topic"]
    p topic
    Database.add_topic topic
    "hello"
  end

  # VINCEEEEEEEEEEEEEEEEEEENNNNNNNNNTTTTTTTTTTTTTTTT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111111
  get '/set_topics' do
    id = 2
    topics = [
      "Politics",
      "Russia",
      "Trump"
    ]
    Database.set_topics_for_article id, topics
  end

  # Add a view to the database
  post '/add_view' do
    resp = JSON.parse(request.body.read)
    url = resp["url"]
    rows = Database.get_article_by_url url
    row = rows[0]
    if row != nil
      id = row["id"]
      views = row["views"]
    else
      name = resp["title"]
      Database.execute "INSERT INTO articles (name, url, reports, views) VALUES (?, ?, ?, ?)", [name, url, 0, 0]
      result = Database.execute "SELECT * FROM articles ORDER BY id DESC LIMIT 1"
      result = result[0]
      id = result["id"]
      views = 0
      add_topics_to_article(id, url)
    end
    Database.execute "UPDATE articles SET views = #{views + 1} WHERE id = ?", id
  end

  # Add a fake news report to a url in the database
  post '/add_report' do
    url     = request.env["HTTP_REPORT_URL"]
    rows    = Database.get_article_by_url url
    article = rows[0]
    reports = article["reports"]
    id      = article["id"]
    Database.execute "UPDATE articles SET reports = #{reports + 1} WHERE id = #{id}"
  end
end
