class App < Sinatra::Base
  get '/' do
    @articles = (Article.select_all where: 'reports > 0').map { |a| Article.new a }
    slim :index
  end

  get '/reports' do
    url = request.env["HTTP_REPORT_URL"]
    JSON.generate (Database.execute "SELECT * FROM articles WHERE url = #{"\"" + url + "\""}")[0]
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
    views = (Database.execute "SELECT views FROM articles WHERE url = #{"\"" + url + "\""}")[0]["views"]
    p views
    Database.execute "UPDATE articles SET views = #{views + 1} WHERE url = #{"\"" + url + "\""}"
  end

  post '/add_report' do
    url = request.env["HTTP_REPORT_URL"]
    reports = (Database.execute "SELECT reports FROM articles WHERE url = #{"\"" + url + "\""}")[0]["reports"]
    Database.execute "UPDATE articles SET reports = #{reports + 1} WHERE url = #{"\"" + url + "\""}"
  end
end
