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
  puts 'get dtmlx data : ' + data.to_s
  
  data

end

post "/data" do
  
  puts params 

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

get '/bryntum_data' do

  thng = everythng_get("https://api.evrythng.com/thngs/5202545fe4b0f5b53dfb45b5")

  properties = JSON.parse(thng)["properties"]
  title = properties["text"]
  startdate = properties["start_date"]
  enddate = properties["end_date"]

  "[{ResourceId : 'MadMike', Type : 'Call', Title : '#{title}', StartDate : '#{startdate}', EndDate : '#{enddate}'}]"

end

post '/bryntum_data' do

  data = request.body.read
  puts data
  
  properties = JSON.parse(data)["data"]
  puts properties
  
  thng_uri = "https://api.evrythng.com/thngs/5202545fe4b0f5b53dfb45b5/properties"
    
  start_date = '{"key" : "start_date", "value" : "' + DateTime.parse(properties["StartDate"]).strftime("%Y-%m-%d %H:%M") + '"}'
  end_date = '{"key" : "end_date", "value" : "' + DateTime.parse(properties["EndDate"]).strftime("%Y-%m-%d %H:%M") + '"}'
  text = '{"key" : "text", "value" : "' + properties["Title"] + '"}'

  data = "[#{start_date}, #{end_date}, #{text}]"
  puts everythng_put(thng_uri, data)  

end
