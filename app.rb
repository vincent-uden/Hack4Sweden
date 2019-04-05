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

  # get '/hello' do
  #   response.headers["Access-Control-Allow-Origin"] = "*"
  #   return "Hello!"
  # end

  post '/add_view' do
    url = request.env["HTTP_VIEW_URL"]
    query = "SELECT * FROM articles"
    views = (Database.execute query)
    ap views
    views.select! { |row| row["url"] == url}
    views = views[0]
    p views
    if views != nil
      id = views["id"]
      views = views["views"]
    else
      # New website
      name = request.env["HTTP_VIEW_TITLE"]
      Database.execute "INSERT INTO articles (name, url, reports, views) VALUES (?, ?, ?, ?)", [name, url, 0, 0]
      result = Database.execute "SELECT * FROM articles ORDER BY id DESC LIMIT 1"
      result = result[0]
      id = result["id"]
      views = 0
    end
    Database.execute "UPDATE articles SET views = #{views + 1} WHERE id = ?", id
  end

  # TODO! NO WORKIE!!!!! IT GO NIL[] ERROR
  post '/add_report' do
    url = request.env["HTTP_REPORT_URL"]
    reports = (Database.execute "SELECT reports FROM articles WHERE url = #{"\"" + url + "\""}")[0]["reports"]
    Database.execute "UPDATE articles SET reports = #{reports + 1} WHERE url = #{"\"" + url + "\""}"
  end
end
