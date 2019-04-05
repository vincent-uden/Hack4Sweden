require_relative 'env'

API_KEY = (File.read 'apikey.txt').chomp

def get_response(url)
  conn = Faraday.new nil, request: { timeout: 20 }

  response = conn.post do |req|
    req.url 'https://api.textrazor.com'
    req.headers['X-TextRazor-Key'] = API_KEY
    req.body = {
      'extractors': 'topics',
      'url': url
    }
  end


  JSON.parse(response.body)["response"]
end

def parse_response(response_hash)
  if response_hash["coarseTopics"]
    coarse_topic = response_hash["coarseTopics"][0]["label"]
  end
  if response_hash["topics"]
    fine_topics = response_hash["topics"][0..9].map { |topic| topic["label"] }
  else
    fine_topics = []
  end

  if coarse_topic == nil
    output = fine_topics
  else
    output = [coarse_topic] + fine_topics
  end
  output
end

def async_get_topics(url)
  Async do |task|
    resp = get_response(url)
  end
end

def add_topics_to_article(article_id, url)
  p article_id
  p url
  task = Async do
    async_get_topics url
  end

  response = task.wait

  parsed = parse_response(response.result)
  Database.set_topics_for_article article_id, parsed
end

#r = get_response('https://edition.cnn.com/2019/04/04/europe/russia-arctic-kotelny-island-military-base/index.html')
#r = get_response('https://www.foxnews.com/politics/sharpton-emerges-as-kingmaker-as-2020-democrats-court-for-his-approval')
#r = get_response('https://www.aftonbladet.se/nyheter/a/MR7kVK/skarp-kritik-mot-elsparkcyklar-livsfara-for-synskadade')
#p (parse_response r)
#pr = parse_response(r)
