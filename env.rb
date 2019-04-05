require 'bundler'

Bundler.require

require_relative './database/database'
require_relative './database/models/tables'
require_relative './database/models/article'
require_relative './keyword_api'

require 'json'
