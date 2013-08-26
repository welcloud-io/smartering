require "net/https"
require "uri"

#~ curl -i -H "Accept: application/json" -H "Authorization: Token 2WONAtJj1jxWAjU9ixhZpcwSTZQmNPKmDJNGEJJJCB85RwJjSJJ8qpH7DLu9ivXPDI7CxpdvlZ9HmCdw" -X GET "https://api.evrythng.com/thngs"
def everythng_get(uri)
	
  puts("GET : " + uri  )
	
  uri = URI.parse(uri)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE

  request = Net::HTTP::Get.new(uri.request_uri)
  request.add_field("Accept", "application/json")
  request.add_field("Authorization","2WONAtJj1jxWAjU9ixhZpcwSTZQmNPKmDJNGEJJJCB85RwJjSJJ8qpH7DLu9ivXPDI7CxpdvlZ9HmCdw")

  response = http.request(request)
  response.body

end

#~ curl -i -H "Content-Type: application/json" -H "Authorization: 2WONAtJj1jxWAjU9ixhZpcwSTZQmNPKmDJNGEJJJCB85RwJjSJJ8qpH7DLu9ivXPDI7CxpdvlZ9HmCdw"  -X PUT 'https://api.evrythng.com/thngs/5202545fe4b0f5b53dfb45b5/properties' -d '[{"key": "year","value": "1968"},{"key": "color","value": "red"}]'
def everythng_put(uri, content)
	
  puts("PUT : " + uri + ' (' + content +')' )
	
  uri = URI.parse(uri)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE

  request = Net::HTTP::Put.new(uri.request_uri)
  request.add_field("Content-Type","application/json")
  request.add_field("Authorization","2WONAtJj1jxWAjU9ixhZpcwSTZQmNPKmDJNGEJJJCB85RwJjSJJ8qpH7DLu9ivXPDI7CxpdvlZ9HmCdw")

  request.body = content

  response = http.request(request)
  response.body

end

def everythng_delete(uri)

  puts("DELETE : " + uri )
	
  uri = URI.parse(uri)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE

  request = Net::HTTP::Delete.new(uri.request_uri)
  request.add_field("Accept", "application/json")
  request.add_field("Authorization","2WONAtJj1jxWAjU9ixhZpcwSTZQmNPKmDJNGEJJJCB85RwJjSJJ8qpH7DLu9ivXPDI7CxpdvlZ9HmCdw")

  response = http.request(request)
  response.body

end

#~ everythng_delete("https://api.evrythng.com/thngs/5202545fe4b0f5b53dfb45b5/properties/")

#~ puts everythng_get("https://api.evrythng.com/thngs")
#~ puts everythng_get("https://api.evrythng.com/thngs/5202545fe4b0f5b53dfb45b5")
#~ puts everythng_get("https://api.evrythng.com/thngs/5202545fe4b0f5b53dfb45b5/properties")

#~ puts everythng_put("https://api.evrythng.com/thngs/5202545fe4b0f5b53dfb45b5/properties", 
#~ '[
#~ {"key" : "text", "value" : "Lancement du projet smartering (Euratechnologies - Atrium)"}, 
#~ {"key" : "start_date", "value" : "2013-08-29 10:05"}, 
#~ {"key" : "end_date", "value" : "2013-08-29 12:05"}
#~ ]'
#~ )

#~ require 'json'
#~ text = everythng_get("https://api.evrythng.com/thngs/5202545fe4b0f5b53dfb45b5")
#~ jtext = JSON.parse(text)
#~ puts jtext["properties"]["text"]



