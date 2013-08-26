require 'sinatra'
require './evrythng'

require 'json'

set :public_folder, '.'

get '/' do
 
  redirect 'meetings.html'

end

get "/data" do

  thng = everythng_get("https://api.evrythng.com/thngs/5202545fe4b0f5b53dfb45b5")
  
  data = '[' + JSON.generate(JSON.parse(thng)["properties"]) + ']'
  puts data
  
  data

end

post "/data" do
  
  start_date = nil; end_date = nil; text = nil
    
  params.each do |key, value|
    
    start_date = value if key.to_s.match(/\d*_?start_date$/) 
    end_date = value if key.to_s.match(/\d*_?end_date$/) 
    text = value if key.to_s.match(/\d*_?text$/) 

  end 
  
  thng_uri = "https://api.evrythng.com/thngs/5202545fe4b0f5b53dfb45b5/properties"
  
  start_date = '{"key" : "start_date", "value" : "' + start_date.to_s + '"}'
  end_date = '{"key" : "end_date", "value" : "' + end_date.to_s + '"}'
  text = '{"key" : "text", "value" : "' + text.to_s + '"}'

  data = "[#{start_date}, #{end_date}, #{text}]"
  puts everythng_put(thng_uri, data)

end

