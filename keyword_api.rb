require_relative 'env'

API_KEY = (File.read 'apikey.txt').chomp

def get_response(url)
  conn = Faraday.new

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
  coarse_topic = response_hash["coarseTopics"][0]["label"]
  fine_topics = response_hash["topics"][0..9].map { |topic| topic["label"] }

  [coarse_topic] + fine_topics
end

#r = get_response('https://edition.cnn.com/2019/04/04/europe/russia-arctic-kotelny-island-military-base/index.html')
#r = get_response('https://www.foxnews.com/politics/sharpton-emerges-as-kingmaker-as-2020-democrats-court-for-his-approval')
#r = get_response('https://www.aftonbladet.se/nyheter/a/MR7kVK/skarp-kritik-mot-elsparkcyklar-livsfara-for-synskadade')
#p (parse_response r)
#pr = parse_response(r)
